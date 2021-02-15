// express middleware to check if client is logged in
const loggedIn = (req, res, next) =>
{
  if (!req.session || !req.session.loggedIn || !req.session.user_id) res.redirect('/user/login');
  else next();
};

module.exports = loggedIn;
