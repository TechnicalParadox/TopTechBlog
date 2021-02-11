const router = require('express').Router();

// <server>/ - Default URL, should serve index.html // TODO:
router.get('', (req, res) =>
{
  res.status(200).json({ message: 'Hello world!' });
});
// HTML routes here // TODO: 

module.exports = router;
