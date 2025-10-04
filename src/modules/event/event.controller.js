const { User } = require('../../models');
const sendMessage = require('../../service/message.service')

exports.eventPage = async (req, res) => {
  try {
    const userId = req.session.userId
    if(userId){
      const user = await User.findByPk(userId)
      return res.render('event', { user: user.name.split(' ')[0] });
    }
    res.redirect('/sign#in')
  } catch (error) {
    console.error('Error fetching events:', error);
    await sendMessage('Server Error', 'Something went wrong', 500, res)
  }
};