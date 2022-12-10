const router = require('express').Router();

const { Note, Blog, User, Team } = require('../models');

const { tokenExtractor } = require('../util/middleware');

router.get('/', async (req, res) => {
  const users = await User.findAll({
    include: [{
      model: Note,
      attributes: { exclude: ['userId'], },
    }, {
      model: Blog,
      attributes: { exclude: ['userId'], },
    },
    {
      model: Team,
      attributes: ['id', 'name'],
      through: {
        attributes: []
      }
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
  const where = {};

  if (req.query.read) {
    where.read = req.query.read === 'true';
  }

  const user = await User.findByPk(req.params.id, {
    attributes: { exclude: [''] },
    include: [
      {
        model: Note,
        attributes: { exclude: ['userId'] },
      },
      {
        model: Note,
        as: 'markedNotes',
        attributes: { exclude: ['userId'] },
        through: {
          attributes: []
        },
        include: {
          model: User,
          attributes: ['name'],
        }
      },
      {
        model: Blog,
        attributes: { exclude: ['userId'] },
      },
      {
        model: Blog,
        as: 'readings',
        attributes: { exclude: ['userId'] },
        through: {
          attributes: ['id', 'read'],
          where,
        },
      },
    ],
  });

  if (!user) {
    return res.status(404).end();
  }

  let teams = undefined;
  if (req.query.teams) {
    teams = await user.getTeams({
      attributes: ['name'],
      joinTableAttributes: [],
    });
  }

  res.json({ ...user.toJSON(), teams });
});

const isAdmin = async (req, res, next) => {
  const user = await User.findByPk(req.decodedToken.id);
  if (!user.admin) {
    return res.status(401).json({ error: 'operation not permitted' });
  }
  next();
};

// Note: we skip the disabled field check when user has admin privileges
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
