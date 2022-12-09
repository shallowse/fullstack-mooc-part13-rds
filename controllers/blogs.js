const router = require('express').Router();

const { Op } = require('sequelize');

const { Blog, User } = require('../models');

const { tokenExtractor } = require('../util/middleware');

router.get('/', async (req, res) => {
  const where = {};

  if (req.query.search) {
    // https://stackoverflow.com/a/57716890
    where[Op.or] = [
        { title: { [Op.iLike]: `%${req.query.search}%` } }, // https://stackoverflow.com/a/57372107
        { author: { [Op.iLike]: `%${req.query.search}%` } },
      ];
  }

  const blogs = await Blog.findAll({
    attributes: { exclude: ['userId'] },
    include: {
      model: User,
      attributes: ['name'],
    },
    where,
    order: [
      ['likes', 'DESC']
    ],
  });
  //console.log(JSON.stringify(blogs, null, 2));
  res.json(blogs);
});

router.post('/', tokenExtractor, async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id);
  const blog = await Blog.create({ ...req.body, userId: user.id });
  return res.json(blog);
});

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id);
  next();
};

router.get('/:id', blogFinder, async (req, res) => {
  if (req.blog) {
    console.log(JSON.stringify(req.blog, null, 2));
    res.json(req.blog);
  } else {
    res.status(404).end();
  }
});

router.delete('/:id', tokenExtractor, blogFinder, async (req, res) => {
  if (req.decodedToken.id == req.params.id) {
    await req.blog.destroy();
    res.json(req.blog);
  } else {
    res.status(401).json({ error: 'You are not authorized to delete' });
  }
});

router.put('/:id', blogFinder, async (req, res) => {
  if (req.blog) {
    req.blog.likes = req.body.likes;
    await req.blog.save();
    res.json(req.blog);
  } else {
    res.status(404).end();
  }
});

module.exports = router;
