// express router
const router = require('express').Router();
// Post, User, and Comment model for use in sequelize queries
const { Post, User, Comment } = require('../../models');
// express middleware
const loggedIn = require('../../utils/checkLogin.js');
// uniqid
const uniqid = require('uniqid');

// create a new post
// expects { title: 'abc', text: 'abcdef' }
router.post('/', loggedIn, (req, res) =>
{
  Post.create(
  {
    id: uniqid(),
    owner: req.session.user_id,
    title: req.body.title,
    text: req.body.text
  })
  .then(dbPostData => { return res.status(200).redirect('/post/'+dbPostData.id); })
  .catch(err =>
  {
    console.log('./CONTROLLERS/API/POSTROUTES ERROR', '/ - POST', err);
    return res.status(500).json(err);
  })
});

// update a post
// expects { title: 'Abc', text: 'Abcdef...' }
router.put('/:id', loggedIn, (req, res) =>
{
  // first we find the post the client is referencing
  Post.findOne(
  {
    where: { id: req.params.id },
    attributes: ['owner']
  })
  .then(postData =>
  {
    // if there is no post with a matching id we notify and return
    if (!postData) { return res.status(404).json({ message: 'Post with this ID does not exist' }); }

    // otherwise, we verify that the client user owns the post
    const verified = postData.verifyOwner(req.session.user_id);

    // if they do not own the post, they do not have permission, notify and return
    if (!verified) { return res.status(401).json({ message: 'You do not have permission to do that' }); }

    // otherwise, we update the post with the new information
    Post.update(
    {
      title: req.body.title, text: req.body.text
    },
    {
      where: { id: req.params.id }
    })
    .then(updatedPostData =>
    {
      // if no information was updated
      if (!updatedPostData) { return res.status(404).json({ message: 'Nothing was updated'}); }

      // otherwise, redirect client to updated post
      return res.status(200).redirect('/posts/'+req.params.id);
    })
    .catch(err =>
    {
      console.log("./CONTROLLERS/API/POSTROUTES ERROR", "/:id - PUT, Post.update", err);
      return res.status(500).json(err);
    })
  })
  .catch(err =>
  {
    console.log("./CONTROLLERS/API/POSTROUTES ERROR", "/:id - PUT, Post.findOne", err);
    return res.status(500).json(err);
  })
});

// delete a post
router.delete('/:id', loggedIn, async (req, res) =>
{
  // first we find the post the client is referencing
  Post.findOne(
  {
    where: { id: req.params.id },
    attributes: ['owner']
  })
  .then(postData =>
  {
    // if there is no post with a matching id we notify and return
    if (!postData) { return res.status(404).json({ message: 'Post with this ID does not exist' }); }

    console.log('./CONTROLLERS/API/POSTROUTES ALERT', `User ${req.session.user_id} is attempting to delete Post ${req.params.id}`);

    // otherwise, we verify that the client user owns the post
    const verified = postData.verifyOwner(req.session.user_id);

    // if they do not own the post, they do not have permission, notify and return
    if (!verified) { return res.status(401).json({ message: 'You do not have permission to do that' }); }

    // otherwise, we destroy the post
    Post.destroy({ where: { id: req.params.id }})
    .then(deletedPost => { res.status(200).redirect('/') })
    .catch(err =>
    {
      console.log('./CONTROLLERS/API/POSTROUTES ERROR', '/:id - DELETE B', err);
      return res.status(500).json(err);
    });
  })
  .catch(err =>
  {
    console.log('./CONTROLLERS/API/POSTROUTES ERROR', '/:id - DELETE A', err);
    return res.status(500).json(err);
  });
});

module.exports = router;
