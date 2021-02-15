const router = require('express').Router();
const postRoutes = require('./postRoutes.js');
const userRoutes = require('./userRoutes.js');
// sequelize connection
const sequelize = require('../../config/connection');
// sequelize Models
const { Post, User, Comment } = require('../../models');

// <server>/ - Default URL, should serve index.html // TODO:
router.get('', (req, res) =>
{
  Post.findAll(
  {
    attributes: ['id', 'title', 'text', 'createdAt', 'updatedAt',
      [sequelize.literal('(SELECT COUNT(*) FROM comment WHERE post.id = comment.post)'), 'numComments'] ],
    include: [{ model: User, as: 'post_owner', attributes: ['id', 'username'] }]
  })
  .then(dbPostData =>
  {
    if (!dbPostData) return res.status(404).redirect('/');

    return res.status(200).render('index', { loggedIn: req.session.loggedIn });
  })
  .catch(err =>
  {
    console.log('/CONTROLLERS/HTML/INDEX ERROR', err);
    return res.status(500).json(err);
  });
});

// HTML routes here // TODO:
router.use('/post', postRoutes);
router.use('/user', userRoutes);

module.exports = router;
