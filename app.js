require('dotenv').config();
const express = require('express');
const session = require('express-session')
const path = require('path')
const fs = require('fs');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const { createServer } = require('http');
const { Server } = require('socket.io')

const sequelize = require('./src/config/sequelize.db');
const env = require('./src/config/env');
const googleConfig = require('./src/config/googleOauth');
const authRoutes = require('./src/modules/auth/auth.route');
const pageRoutes = require('./src/modules/page/page.route');
const dashboardRoutes = require('./src/modules/dashboard/dashboard.route');


const publicDir = path.join(__dirname, 'public');
const pagesDir = path.join(publicDir, 'pages');
const serveStaticPages = require('./src/middleware/serveStaticPages');

const app = express();
const server = createServer(app);
const io = new Server(server);
const port = env.PORT || 3000;

// Configure Passport
passport.use(new GoogleStrategy(googleConfig,
  (accessToken, refreshToken, profile, done) => {
    return done(null, profile);
  }
));

// Database Connection
sequelize.authenticate()
  .then(() => console.log('Database connected'))
  .catch(err => console.error('Database connection error:', err));

// Sync models
sequelize.sync({ force: true }) // Use force: true only for development
  .then(() => console.log('Database synced'))
  .catch(err => console.error('Database sync error:', err));

// View Engine
app.set('view engine', 'ejs')

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended:false }))
app.use(passport.initialize());

//Session
app.use(session({
  secret: process.env.SESSION_SECRET_KEY,
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,
    maxAge: 1000 * 60 * 60
  }
}))

// Routes
app.use('/', pageRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/dashboard', dashboardRoutes);

// Serve static assets from public directory
app.use(express.static(publicDir));

// Serve Static Pages Middleware
app.use(serveStaticPages(publicDir));


// 404 handler - must be after all other routes
app.use((req, res) => {
  const notFoundPath = path.join(pagesDir, '404.html');
  if (fs.existsSync(notFoundPath)) {
    res.status(404).sendFile(notFoundPath);
  } else {
    res.status(404).send('Page not found');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`Google Auth URL: http://localhost:${port}/api/v1/auth/google`);

  // List Discovered Pages
  const pages = discoverPages(pagesDir);
  pages.forEach(page => {
    console.log(`  http://localhost:${port}/${page.route}`);
  });
});

// Page Discovery Function
function discoverPages(dir, baseRoute = '') {
  const pages = [];
  
  try {
    const items = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const item of items) {
      const fullPath = path.join(dir, item.name);
      
      if (item.isDirectory()) {
        // Recursively discover pages in subdirectories
        const subPages = discoverPages(fullPath, `${baseRoute}${item.name}/`);
        pages.push(...subPages);
      } else if (item.isFile() && path.extname(item.name) === '.html') {
        // Add page to list without extension
        const nameWithoutExt = path.basename(item.name, '.html');
        let route;
        
        if (nameWithoutExt === 'index') {
          // index.html files become the directory route
          route = baseRoute || '/';
        } else {
          // Other HTML files get their own route
          route = `${baseRoute}${nameWithoutExt}`;
        }
        
        pages.push({
          file: item.name,
          path: fullPath,
          route: route.replace(/\/$/, '') // Remove trailing slash
        });
      }
    }
  } catch (err) {
    console.error('Error reading pages directory:', err);
  }
  
  return pages;
}