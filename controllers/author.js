const router = require('express').Router();
const { sequelize } = require('../util/db');

const { Blog } = require('../models');

router.get('/', async (req, res) => {
  const blogs = await Blog.findAll({
    group: 'author',
    attributes: [
      'author',
      [sequelize.fn('COUNT', sequelize.col('title')), 'blogs'],
      [sequelize.fn('SUM', sequelize.col('likes')), 'likes'],
    ]
  });
  res.json(blogs);
});

module.exports = router;
