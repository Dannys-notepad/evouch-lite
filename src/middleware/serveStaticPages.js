const fs = require('fs');
const path = require('path');

module.exports = (publicDir) => {
  const pagesDir = path.join(publicDir, 'pages');
  
  return (req, res, next) => {
    if (req.method !== 'GET') return next();
    
    // Skip API routes
    if (req.path.startsWith('/api/')) return next();
    
    // Skip routes that should be handled by EJS (add your EJS routes here)
    const ejsRoutes = ['/dashboard', '/profile', '/settings']; // Add all your EJS routes
    if (ejsRoutes.includes(req.path)) return next();
    
    const cleanPath = req.path.replace(/\/$/, '').split('?')[0];
    
    // Special handling for root path
    if (cleanPath === '') {
      const indexPath = path.join(pagesDir, 'index.html');
      if (fs.existsSync(indexPath)) {
        return res.sendFile(indexPath);
      }
      return next();
    }
    
    // Check for HTML files without extensions
    const possibleFiles = [
      path.join(pagesDir, cleanPath + '.html'),
      path.join(pagesDir, cleanPath, 'index.html')
    ];
    
    for (const filePath of possibleFiles) {
      if (fs.existsSync(filePath)) {
        return res.sendFile(filePath);
      }
    }
    
    next(); // Continue to next middleware if no file found
  };
};