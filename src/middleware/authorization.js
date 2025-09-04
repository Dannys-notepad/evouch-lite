const jwt = require('jsonwebtoken');
const env = require('../config/env')
const Users = require('../models/User');

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer')) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    //const token = authHeader.substring(7);
    //console.log(token)

    jwt.verify(token, env.JWT_SECRET, async (error, payload) => {
      if (error) {
        return res.status(401).json({ 
          response: {
            message: 'Invalid token',
            status: 401
          }
        });
      }

      const user = await Users.pk({ where: { id: payload.userId } });
      if (!user) {
        return res.status(401).json({
          response: {
            message: 'user not found',
            status: 401
          }
         });
      }

      if (!user.isVerified) {
        return res.status(401).json({
          response: {
            message: 'Account not verified',
            status: 401
          }
        });
      }

      res.user = {
        name: user.name,
        email: user.email,
        id: user.id
      }
      next();
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
