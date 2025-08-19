const jwt = require('jsonwebtoken');
const env = require('../../config/env');
const { User } = require('../../models');
const generate = require('../../utils/generate'); // Assuming you have a utility to gene

class AuthService {
  static async handleGoogleAuth(profile) {
    // Try to find user by googleId
    let user = await User.findOne({ where: { googleId: profile.id } });
    
    if (!user) {
      // If not found, try by email
      user = await User.findOne({ where: { email: profile.emails[0].value } });
      
      if (user) {
        // Update existing user with Google ID
        user.googleId = profile.id;
        await user.save();
      } else {
        // Create new user
        const userId = generate.UserId();
        console.log('Generated User ID:', userId);
        user = await User.create({
            id: userId,
            googleId: profile.id,
            email: profile.emails[0].value,
            name: profile.displayName,
            authMethod: 'google'
        });
      }
    }
    
    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    
    return token;
  }
}

module.exports = AuthService;