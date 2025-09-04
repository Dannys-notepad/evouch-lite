const jwt = require('jsonwebtoken');
const env = require('../config/env');
const { magicLinkTemp } = require('../template/magicLink')
const sendMagicLinkEmail = require('./mailer.service');

module.exports =  async (user, protocol, host) => {
    try {
        const token = jwt.sign({ id: user.id }, env.JWT_SECRET, { expiresIn: '5min' });

        const magicLink = `${protocol}://${host}/api/v1/auth/magic-link?token=${token}`;

        const mailFormat = {
            email: user.email,
            subject: 'MAGIC LOGIN LINK',
            html: magicLinkTemp(user.name.split(' ')[0], magicLink)
        }

        await sendMagicLinkEmail(mailFormat);

        return magicLink;

    } catch (e) {
        console.error('Error in magicLink.service:', e);
    }
}
