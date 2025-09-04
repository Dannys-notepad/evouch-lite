const passport = require('passport');
const AuthService = require('./auth.service');

class AuthController {
  static async googleCallback(req, res) {
    try {
      const uid = await AuthService.handleGoogleAuth(req.user);
      //console.log(uid)
      req.session.userId = uid;
      res.redirect(`/dashboard`);
      //res.json({ token });
    } catch (error) {
      console.error('Google authentication failed:', error);
      res.status(500).json({ error: 'Authentication failed' });
    }
  }


  static async signup(req, res) {
    try {
      const {firstName, lastName, email } = await req.body;
      const data = {
        host: req.get('host'),
        protocol: req.protocol
      , firstName, lastName, email
      }
      const result = await AuthService.handleSignup(data);
      if (result.id) {
        const title = encodeURIComponent('Signup successful');
        const body = encodeURIComponent('Signup was successful, an email with the login link has been sent to your email address');
      res.redirect(`/message?title=${title}&body=${body}`);
      } else {
        res.redirect(`/message?msg=${result.msg}`);
      }
    } catch (error) {
      console.error('Magic link signup failed:', error);
      const title = encodeURIComponent('Signup failed');
      const body = encodeURIComponent('Something went wrong during signup. Please try again.');
      res.redirect(`/message?title=${title}&body=${body}`);
    }
  }

  static async signin(req, res) {
    try {
      const { email } = req.body;
      const data = {
        host: req.get('host'),
        protocol: req.protocol,
        email
      };
      const result = await AuthService.handdleSignin(data);
      if (result.msg === 'success') {
        const title = encodeURIComponent('Signin successful');
        const body = encodeURIComponent('Signin was successful, an email with the login link has been sent to your email address');
        res.redirect(`/message?title=${title}&body=${body}`);
      } else if (result.msg === 'failed') {
        const title = encodeURIComponent('Signin failed');
        const body = encodeURIComponent('User do not exist');
        res.redirect(`/message?title=${title}&body=${body}`);
      }
    } catch (e) {
      console.error('Signin failed:', e);
      const title = encodeURIComponent('Signin failed');
      const body = encodeURIComponent('Something went wrong during signin. Please try again.');
      res.redirect(`/message?title=${title}&body=${body}`);
    }
  }

  static async validateMagicLink(req, res) {
    try {
      const { token } = req.query;
      if (!token) {
        const title = encodeURIComponent('Validation failed');
        const body = encodeURIComponent('No magic link token provided.');
        return res.redirect(`/message?title=${title}&body=${body}`);
      }
      const userId = await AuthService.handdleMagicLinkValidation(token);
      if (userId) {
        req.session.userId = userId;
        res.redirect(`/dashboard`);
      } else {
        const title = encodeURIComponent('Validation failed');
        const body = encodeURIComponent('Invalid or expired magic link');
        res.redirect(`/message?title=${title}&body=${body}`);
      }
    } catch (error) {
      console.error('Magic link validation failed:', error);
      const title = encodeURIComponent('Validation failed');
      const body = encodeURIComponent('The magic link you provided is invalid or has expired.');
      res.redirect(`/message?title=${title}&body=${body}`);
    }
  }
}

module.exports = AuthController;