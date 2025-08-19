require('dotenv').config();
const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const sequelize = require('./src/config/sequelize.db');
const env = require('./src/config/env');
const googleConfig = require('./src/config/googleOauth');
const authRoutes = require('./src/modules/auth/auth.route');

const app = express();

// Configure Passport
passport.use(new GoogleStrategy(googleConfig,
  (accessToken, refreshToken, profile, done) => {
    return done(null, profile);
  }
));

// Database connection
sequelize.authenticate()
  .then(() => console.log('Database connected'))
  .catch(err => console.error('Database connection error:', err));

// Sync models
sequelize.sync({ force: true }) // Use force: true only for development
  .then(() => console.log('Database synced'))
  .catch(err => console.error('Database sync error:', err));

// Middleware
app.use(express.json());
app.use(passport.initialize());

// Routes
app.use('/api/v1/auth', authRoutes);


app.listen(env.PORT, () => {
  console.log(`Server running on port ${env.PORT}`);
  console.log(`Google Auth URL: http://localhost:${env.PORT}/api/v1/auth/google`);
});