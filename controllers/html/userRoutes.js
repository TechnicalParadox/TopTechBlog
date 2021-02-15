// express router
const router = require('express').Router();
// checkLogin express middleware
const loggedIn = require('../../utils/checkLogin');
// sequelize connection
const sequelize = require('../../config/connection');
// sequelize Models
const { Post } = require('../../models');

router.get('/login', (req, res) =>
{
  res.render('login', { loggedIn: req.session.loggedIn });
});

router.get('/dashboard', loggedIn, (req, res) =>
{
  Post.findAll(
  {
    where: { owner: req.session.user_id },
    order: [['createdAt', 'DESC']],
    attributes: ['id', 'title', 'text', 'createdAt', 'updatedAt',
      [sequelize.literal('(SELECT COUNT(*) FROM comment WHERE post.id = comment.post)'), 'numComments'] ]
  })
  .then(dbPostData =>
  {
    if (!dbPostData) return res.status(404).redirect('/');

    const posts = dbPostData.map(post => post.get({ plain: true }));
    return res.status(200).render('dashboard', {posts, loggedIn: req.session.loggedIn});
  })
  .catch(err =>
  {
    console.log('/CONTROLLERS/HTML/INDEX ERROR', err);
    return res.status(500).json(err);
  });
});

module.exports = router;
