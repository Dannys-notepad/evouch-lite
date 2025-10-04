const { User } = require('../../models');

exports.dashboardController = async (req, res) => {
  const userId = req.session.userId;
  if (userId) {
    const user = await User.findByPk(userId);
    if (user) {
      return res.render('dashboard', { user: user.name.split(' ')[0] });
    }
    // Optionally handle if user not found
    return res.redirect('/sign#in');
  }
  return res.redirect('/sign#in');
};