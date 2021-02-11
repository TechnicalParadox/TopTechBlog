// express router
const router = require('express').Router();
// Post, User, and Comment model for use in sequelize queries
const { Post, User, Comment } = require('../../models');
// express middleware
const loggedIn = require('../../utils/checkLogin.js');

// create a new post
router.post('/', loggedIn, (req, res) =>
{
  // TODO: Post.create
});

// update a post
// expects { title: 'Abc', text: 'Abcdef...' }
router.put('/:id', loggedIn, (req, res) =>
{
  // first we find the post the client is referencing
  Post.findOne( // WARNING: not sure if 'attributes: ['owner'] will prevent verifyOwner method from running'
  {
    where: { id: req.params.id },
    attributes: ['owner']
  })
  .then(postData =>
  {
    // if there is no post with a matching id we notify and return
    if (!postData) { res.status(404).json({ message: 'Post with this ID does not exist' }); return; }

    // otherwise, we verify that the client user owns the post
    const verified = postData.verifyOwner(req.session.user_id);

    // if they do not own the post, they do not have permission, notify and return
    if (!verified) { res.status(401).json({ message: 'You do not have permission to do that'}); return; }

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
      if (!updatedPostData) { res.status(404).json({ message: 'Nothing was updated'}); return; }

      // otherwise, redirect client to updated post
      res.status(200).redirect('/posts/'+req.params.id);
    })
    .catch(err =>
    {
      console.log("./CONTROLLERS/API/POSTROUTES ERROR", "/:id - PUT, Post.update", err);
      res.status(500).json(err);
    })
  })
  .catch(err =>
  {
    console.log("./CONTROLLERS/API/POSTROUTES ERROR", "/:id - PUT, Post.findOne", err);
    res.status(500).json(err);
  })
});

// delete a post
router.delete('/:id', loggedIn, async (req, res) =>
{
  // TODO: find post, verify client user owns it with Post.verifyOwner, Post.destroy
});
