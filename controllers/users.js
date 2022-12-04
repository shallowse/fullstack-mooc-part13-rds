const router = require('express').Router();

const { Note, Blog, User } = require('../models');

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

router.put('/:username', async (req, res) => {
  const user = await User.findOne({ where: { username: req.params.username } });
  if (user) {
    user.name = req.body.name;
    await user.save();
    res.json(user);
  } else {
    res.status(404).end();
  }
});

module.exports = router;
