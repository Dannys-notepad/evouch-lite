const passport = require('passport');
const AuthService = require('./auth.service');
const sendMessage = require('../../service/message.service')

class AuthController {
  static async googleCallback(req, res) {
    try {
      const uid = await AuthService.handleGoogleAuth(req.user);
      req.session.userId = uid;
      res.redirect(`/dashboard`);
    } catch (error) {
      console.error('Google authentication failed:', error);
      await sendMessage('Server Error', 'Could not complete authentication due to server error', 500, res)
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
        await sendMessage('Success', 'Signup was successful, an email with the login link has been sent to your email address', 200, res)
      }
    } catch (error) {
      console.error('Signup failed:', error);
      await sendMessage('Server Error', 'Something went wrong during signup. Please try again.', 500, res)
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
        await sendMessage('Success', 'Signin was successful, an email with the login link has been sent to your email address', 200, res)
      } else if (result.msg === 'failed') {
        await sendMessage('Failed', 'User do not exist', 400, res)
      }
    } catch (e) {
      console.error('Signin failed:', e);
      await sendMessage('Server Error', 'Something went wrong during signin. Please try again.', 500, res)
    }
  }

  static async validateMagicLink(req, res) {
    try {
      const { token } = req.query;
      if (!token) {
        await sendMessage('Failed', 'No token in url.', 400, res)
      }
      const processToken = await AuthService.handdleMagicLinkValidation(token);
      if (processToken) {
        req.session.userId = processToken;
        res.redirect(`/dashboard`);
      } else if (processToken === 'failed') {
        await sendMessage('Failed', 'The magic link has already been used, or do not exist, sign in again to generate another one', 400, res)
      } else {
        await sendMessage('Failed', 'The login link has expired, signin to generate a new one', 400, res)
      }
    } catch (error) {
      console.error('Magic link validation failed:', error);
      await sendMessage('Failed', 'The magic link you provided is invalid or has expired.', 400, res)
    }
  }
}

module.exports = AuthController;