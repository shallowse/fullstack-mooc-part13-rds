const router = require('express').Router();

const { Note, Blog, User } = require('../models');

const { tokenExtractor } = require('../util/middleware');

router.get('/', async (req, res) => {
  const users = await User.findAll({
    include: [{
      model: Note,
      attributes: { exclude: ['userId'], },
    }, {
      model: Blog,
      attributes: { exclude: ['userId'], },
    }],
  });
  res.json(users);
});

router.post('/', async (req, res) => {
  console.log(req.body);
  const user = await User.create(req.body);
  res.json(user);
});

router.get('/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).end();
  }
});

const isAdmin = async (req, res, next) => {
  const user = await User.findByPk(req.decodedToken.id);
  if (!user.admin) {
    return res.status(401).json({ error: 'operation not permitted' });
  }
  next();
};

router.put('/:username', tokenExtractor, isAdmin, async (req, res) => {
  const user = await User.findOne({ where: { username: req.params.username } });
  if (user) {
    if (req.body.name) {
      user.name = req.body.name;
    }
    if (req.body.disabled) {
      user.disabled = req.body.disabled
    }
    await user.save();
    res.json(user);
  } else {
    res.status(404).end();
  }
});

module.exports = router;
