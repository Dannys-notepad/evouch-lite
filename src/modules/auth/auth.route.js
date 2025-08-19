const express = require('express');
const router = express.Router();
const passport = require('passport');
const AuthController = require('./auth.controller');

// Initiate Google authentication
router.get('/google', 
  passport.authenticate('google', { session: false })
);

// Google callback route
router.get('/google/callback', 
  passport.authenticate('google', { session: false, failureRedirect: '/login' }),
  AuthController.googleCallback
);

module.exports = router;