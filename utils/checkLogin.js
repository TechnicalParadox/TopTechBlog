// express middleware to check if client is logged in
const loggedIn = (req, res, next) =>
{
  if (!req.session.user_id) res.redirect('/login');
  else next();
}

module.exports = loggedIn;
