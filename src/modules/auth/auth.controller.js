const passport = require('passport');
const AuthService = require('./auth.service');

class AuthController {
  static async googleCallback(req, res) {
    try {
      const token = await AuthService.handleGoogleAuth(req.user);
      res.json({ token });
    } catch (error) {
      console.error('Google authentication failed:', error);
      res.status(500).json({ error: 'Authentication failed' });
    }
  }
}

module.exports = AuthController;