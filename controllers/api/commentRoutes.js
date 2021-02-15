// express router
const router = require('express').Router();
// Comment model for use in sequelize queries
const { Comment } = require('../../models');
// express middleware
const loggedIn = require('../../utils/checkLogin.js');

// create a new comment
// expects { post: 'nm4l1k3jmnk', text: 'abc' }
router.post('/', loggedIn, (req, res) =>
{
  Comment.create(
  {
    owner: req.session.user_id,
    post: req.body.post,
    text: req.body.text
  })
  .then(dbCommentData => { return res.status(200).redirect('/post/'+dbCommentData.post); })
  .catch(err =>
  {
    console.log('/CONTROLLERS/API/COMMENTROUTES ERROR', '/ POST', err);
    return res.status(500).json(err);
  });
});


// delete a comment
router.delete('/:id', loggedIn, (req, res) =>
{
  // first we find the comment the client is referencing
  Comment.findOne(
  {
    where: { id: req.params.id },
    attributes: ['owner']
  })
  .then(commentData =>
  {
    // if there is no comment with a matching id we notify and return
    if (!commentData) { return res.status(404).json({ message: 'Comment with this ID does not exist' }); }

    console.log('./CONTROLLERS/API/COMMENTROUTES ALERT', `${req.session.user_id} is attempting to delete Comment ${commentData.id}`);

    // otherwise, we verify that the client user owns the comment
    const verified = commentData.verifyOwner(req.session.user_id);

    // if they do not own the comment, they do not have permission, notify and return
    if (!verified) { return res.status(401).json({ message: 'You do not have permission to do that' }); }

    // otherwise, we destroy the comment
    Comment.destroy({ where: { id: commentData.id }})
    .then(deletedComment => { res.status(200).redirect('/') })
    .catch(err =>
    {
      console.log('./CONTROLLERS/API/COMMENTROUTES ERROR', '/:id - DELETE', err);
      return res.status(500).json(err);
    });
  })
  .catch(err =>
  {
    console.log('./CONTROLLERS/API/COMMENTROUTES ERROR', '/:id - DELETE', err);
    return res.status(500).json(err);
  })
});

module.exports = router;
