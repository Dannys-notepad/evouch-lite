const jwt = require('jsonwebtoken');
const env = require('../../config/env');
const { User, MagicLink } = require('../../models');
const generate = require('../../utils/generate');
const magicLinkService = require('../../service/magicLink.service');

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
        //console.log('Generated User ID:', userId);
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
      { id: user.id },
      env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    
    return user.id;
  }

  static async handleSignup(data){
    const { protocol, host } = data;
    let user = await User.findOne({where: {email: data.email}})

    if(user){
      return {
        msg: 'User already exists',
        statusCode: 400
      }
    }
    const newUserId = generate.UserId();
    const newUser = await User.create({
      id: newUserId,
      email: data.email,
      name: `${data.firstName} ${data.lastName}`,
      authMethod: 'magic_link'
    });

    if(newUser){
      
      const magicLinkData = await magicLinkService(newUser, protocol, host);
      const newMagicLink = await MagicLink.create({
        userId: newUser.id,
        token: magicLinkData.split('token=')[1]
      })

      return {
        id: newUser.id,
        magicLinkData
      }
    }
    return {
      msg: 'something went wrong while creating your account',
      statusCode: 500
    }
  }

  static async handdleSignin(data){
    const { protocol, host, email } = data;

    // Try to find user by email
    let user = await User.findOne({where: {email: data.email}})

    if(user){
      const magicLinkData = await magicLinkService(user, protocol, host);
      const newMagicLink = await MagicLink.create({
        userId: user.id,
        token: magicLinkData.split('token=')[1]
      });
      return {
        msg: 'success',
        magicLinkData
      };
    }
    return 'failed' 
  }

  static async handdleMagicLinkValidation(token) {
    try {
      const exists = await MagicLink.findOne({ where: { token } });
      if (exists?.isUsed) {
        return 'failed';
      }
      const decoded = jwt.verify(token, env.JWT_SECRET);
      exists.isUsed = true
      await exists.save()
      return decoded.id;
    } catch (error) {
      console.error('Magic link validation failed:', error);
      return null;
    }
  }
}

module.exports = AuthService;