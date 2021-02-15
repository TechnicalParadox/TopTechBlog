// express router
const router = require('express').Router();
// checkLogin express middleware
const loggedIn = require('../../utils/checkLogin.js');
// checkOwnsPost express middleware
const isPostOwner = require('../../utils/checkOwnsPost.js')
// sequelize connection
const sequelize = require('../../config/connection');
// sequelize Models
const { Post, User, Comment } = require('../../models');

router.get('/:id', (req, res) =>
{
  Post.findOne(
  {
    where: { id: req.params.id },
    attributes: ['title', 'text', 'createdAt', 'updatedAt',
      [sequelize.literal('(SELECT COUNT(*) FROM comment WHERE post.id = comment.post)'), 'numComments'] ],
    include:
    [
      { model: User, as: 'post_owner', attributes: ['id', 'username'] },
      {
        model: Comment,
        as: 'post_comments',
        attributes: ['id', 'text', 'createdAt'],
        order: [[{model: Comment}, 'createdAt', 'DESC']],
        include: [{ model: User, as: 'comment_owner', attributes: ['id', 'username'] }]
      }
    ]
  })
  .then(dbPostData =>
  {
    if (!dbPostData) return res.status(404).redirect('/');

    const post = dbPostData.get({plain:true});
    return res.status(200).render('post', {post, loggedIn: req.session.loggedIn});
  })
  .catch(err =>
  {
    console.log('/CONTROLLERS/HTML/POSTROUTES ERROR', err);
    return res.status(500).redirect('/');
  })
});

router.get('/:id/edit', loggedIn, isPostOwner, (req, res) =>
{
  Post.findOne(
  {
    where: { id: req.params.id },
    attributes: ['title', 'text', 'createdAt', 'updatedAt',
      [sequelize.literal('(SELECT COUNT(*) FROM comment WHERE post.id = comment.post)'), 'numComments'] ],
    include:
    [
      { model: User, as: 'post_owner', attributes: ['id', 'username'] },
      { model: Comment, as: 'post_comments', attributes: ['id', 'text', 'createdAt'], include: [{ model: User, as: 'comment_owner', attributes: ['id', 'username'] }] }
    ]
  })
  .then(dbPostData =>
  {
    if (!dbPostData) return res.status(404).redirect('/');

    return res.status(200).json(dbPostData.get({plain: true}));
  })
  .catch(err =>
  {
    console.log('/CONTROLLERS/HTML/POSTROUTES ERROR', err);
    return res.status(500).redirect('/');
  })
});

module.exports = router;
