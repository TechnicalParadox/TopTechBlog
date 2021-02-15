// express middleware to check if client is owner of post
const { Post } = require('../models');

const isPostOwner = async (req, res, next) =>
{
  Post.findOne({ where: { id: req.params.id }})
  .then(dbPostData =>
  {
    if (!dbPostData) res.status(404).redirect('/');

    // Serialize the data
    const post = dbPostData.get({ plain: true });

    if (post.owner === req.session.user_id) return next();
    return res.status(401).redirect('/post/'+req.params.id);
  })
  .catch(err => { console.log('CHECKOWNSPOST ERROR', err); res.status(500).json(err); });
};

module.exports = isPostOwner;
