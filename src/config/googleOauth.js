const env = require('./env');

module.exports = {
  clientID: env.GOOGLE_CLIENT_ID,
  clientSecret: env.GOOGLE_CLIENT_SECRET,
  callbackURL: env.GOOGLE_CALLBACK_URI,
  scope: ['profile', 'email'],
  state: false
};