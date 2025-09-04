const { User } = require('../../models');

exports.dashboardController = async (req, res) => {
  const userId = req.session.userId;
  if(userId){
    const user = await User.findByPk(userId);
    res.render('dashboard', { user: user.name.split(' ')[0] });
  } else {
    res.redirect('/sign#in');
  }
}