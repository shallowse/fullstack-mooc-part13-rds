const router = require('express').Router();
const { sequelize } = require('../util/db');
const { Readinglist } = require('../models');
const { tokenExtractor, isValidUser } = require('../util/middleware');

router.post('/', tokenExtractor, isValidUser, async (req, res) => {
  const readingList = await Readinglist.create({
    blogId: req.body.blog_id,
    userId: req.body.user_id,
  });
  res.json(readingList);
});

router.put('/:id', tokenExtractor, isValidUser, async (req, res) => {
  const readinglist = await Readinglist.findByPk(req.params.id);
  if (!readinglist) {
    return res.status(404).json({ error: 'readinglist entry not found' });
  }
  if (req.decodedToken.id !== readinglist.userId) {
    return res.status(401)
      .json({ error: 'only correct user can change their read status' });
  }

  readinglist.read = req.body.read === 'true' ? true : false;
  readinglist.save();
  res.json(readinglist);
});

module.exports = router;
