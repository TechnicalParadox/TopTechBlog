// express router
const router = require('express').Router();
// User sequelize model
const { User } = require('../../models');
// checkLogin express middleware
const loggedIn = require('../../utils/checkLogin');

// create a new User
// expects { username: 'abc123', email: 'a@e.c', password: 'toor' }
router.post('/', (req, res) =>
{
  User.create(
  {
    username: req.body.username,
    email: req.body.email,
    passhash: req.body.password // already hashed by bcrypt on beforeCreate
  })
  .then(dbUserData =>
  {
    // // TODO: save session

    res.status(200).redirect('/');
  })
  .catch(err =>
  {
    console.log('./CONTROLLERS/API/USERROUTES ERROR!','/ - POST, User.create' , err);
    res.status(500).json(err);
  })
});

// login as User
// expects { email: 'a@e.c', password: 'toor' }
router.post('/login', async (req, res) =>
{
  User.findOne({ where: { email: req.body.email } })
  .then(dbUserData =>
  {
    if (!dbUserData) { res.status(401).json({ message: 'Invalid email/password' }); return; }

    const match = await dbUserData.checkPassword(req.body.password);

    if (!match) { res.status(401).json({ message: 'Invalid email/password' }); return; }

    // TODO: express session
  })
  .catch(err =>
  {
    console.log('./CONTROLLERS/API/USERROUTES ERROR', '/login - POST, User.findOne', err);
    res.status(500).json(err);
  }
});

// logout of User
router.post('/logout', loggedIn, (req, res) =>
{
  // // TODO: destroy express session
});
