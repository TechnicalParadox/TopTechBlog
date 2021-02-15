// express router
const router = require('express').Router();
// User sequelize model
const { User } = require('../../models');
// checkLogin express middleware
const loggedIn = require('../../utils/checkLogin');
// uniqid
const uniqid = require('uniqid');

// create a new User
// expects { username: 'abc123', email: 'a@e.c', password: 'toor' }
router.post('/', (req, res) =>
{
  User.create(
  {
    id: uniqid(),
    username: req.body.username,
    email: req.body.email,
    passhash: req.body.password // hashed by bcrypt on beforeCreate
  })
  .then(dbUserData =>
  {
    req.session.save(() =>
    {
      req.session.user_id = dbUserData.id;
      req.session.username = dbUserData.username;
      req.session.loggedIn = true;

      return res.status(200).redirect('/');
    });
  })
  .catch(err =>
  {
    console.log('./CONTROLLERS/API/USERROUTES ERROR!','/ - POST, User.create' , err);
    return res.status(500).json(err);
  })
});

// login as User
// expects { email: 'a@e.c', password: 'toor' }
router.post('/login', async (req, res) =>
{
  User.findOne({ where: { email: req.body.email } })
  .then(async dbUserData =>
  {
    if (!dbUserData) { return res.status(401).json({ message: 'Invalid email/password' }); }

    const match = await dbUserData.checkPassword(req.body.password);

    if (!match) { return res.status(401).json({ message: 'Invalid email/password' }); }

    req.session.save(() =>
    {
      req.session.user_id = dbUserData.id;
      req.session.username = dbUserData.username;
      req.session.loggedIn = true;

      return res.status(200).end();
    });
  })
  .catch(err =>
  {
    console.log('./CONTROLLERS/API/USERROUTES ERROR', '/login - POST, User.findOne', err);
    return res.status(500).json(err);
  });
});

// logout of User
router.post('/logout', loggedIn, (req, res) =>
{
  // destryo session
  req.session.destroy(() => { res.status(204).redirect('/'); });
});

module.exports = router;
