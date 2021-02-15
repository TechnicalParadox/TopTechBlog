// express router
const router = require('express').Router();
// checkLogin express middleware
const loggedIn = require('../../utils/checkLogin');
// sequelize connection
const sequelize = require('../../config/connection');
// sequelize Models
const { Post, Comment } = require('../../models');

router.get('/login', (req, res) =>
{

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

    return res.status(200).json(dbPostData);
  })
  .catch(err =>
  {
    console.log('/CONTROLLERS/HTML/INDEX ERROR', err);
    return res.status(500).json(err);
  });
});

module.exports = router;
