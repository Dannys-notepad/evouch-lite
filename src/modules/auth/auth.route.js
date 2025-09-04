const express = require('express');
const router = express.Router();
const passport = require('passport');
const { signupSchema, signinSchema } = require('./auth.validator')
const { googleCallback, signup, signin, validateMagicLink } = require('./auth.controller');


// Initiate Google authentication
router.get('/google', 
  passport.authenticate('google', { session: false })
);

// Google callback route
router.get('/google/callback', 
  passport.authenticate('google', { session: false, failureRedirect: '/sign#in' }),
  googleCallback
);


// Signup route
router.post('/signup', signupSchema, signup);

// Login route
router.post('/signin', signinSchema, signin);

// Magic Link routes
router.get('/magic-link', validateMagicLink);



module.exports = router;