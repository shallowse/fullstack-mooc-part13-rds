const router = require('express').Router();

const { Op } = require('sequelize');

const { Note, User } = require('../models');

const { tokenExtractor } = require('../util/middleware');

router.get('/', async (req, res) => {
  const where = {};

  if (req.query.important) {
    where.important = req.query.important === 'true';
  }

  if (req.query.search) {
    where.content = {
      [Op.substring]: req.query.search
    }
  }

  const notes = await Note.findAll({
    attributes: { exclude: ['userId'] },
    include: {
      model: User,
      attributes: ['name'],
    },
    where,
  });
  //console.log(JSON.stringify(notes, null, 2));
  res.json(notes);
});

router.post('/', tokenExtractor, async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id);
  const note = await Note.create({ ...req.body, userId: user.id, date: new Date() });
  return res.json(note);
});

const noteFinder = async (req, res, next) => {
  req.note = await Note.findByPk(req.params.id);
  next();
};

router.get('/:id', noteFinder, async (req, res) => {
  if (req.note) {
    console.log(req.note.toJSON());
    res.json(req.note);
  } else {
    res.status(404).end();
  }
});

router.delete('/:id', noteFinder, async (req, res) => {
  if (req.note) {
    await req.note.destroy();
  }
  res.status(204).end();
});

router.put('/:id', noteFinder, async (req, res) => {
  if (req.note) {
    req.note.important = req.body.important;
    await req.note.save();
    res.json(req.note);
  } else {
    res.status(404).end();
  }
});

module.exports = router;
