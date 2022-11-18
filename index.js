require('dotenv').config();
const { Sequelize, Model, DataTypes } = require('sequelize');
const express = require('express');
const app = express();

app.use(express.json());

const sequelize = new Sequelize(process.env.DATABASE_URL);

class Note extends Model { }
Note.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  important: {
    type: DataTypes.BOOLEAN,
  },
  date: {
    type: DataTypes.DATE,
  },
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'note',
});

Note.sync();

class Blog extends Model { }
Blog.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  author: DataTypes.TEXT,
  url: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  likes: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'blog',
});

Blog.sync();


app.get('/api/notes', async (req, res) => {
  const notes = await Note.findAll();
  console.log(JSON.stringify(notes, null, 2));
  res.json(notes);
});

app.get('/api/notes/:id', async (req, res) => {
  const note = await Note.findByPk(req.params.id);
  if (note) {
    console.log(note.toJSON());
    res.json(note);
  } else {
    res.status(404).end();
  }
});

app.post('/api/notes', async (req, res) => {
  try {
    const note = await Note.create(req.body);
    return res.json(note);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

app.put('/api/notes/:id', async (req, res) => {
  const note = await Note.findByPk(req.params.id);
  if (note) {
    note.important = req.body.important;
    await note.save();
    res.json(note);
  } else {
    res.status(404).end();
  }
});


app.get('/api/blogs/', async (req, res) => {
  const blogs = await Blog.findAll();
  console.log(JSON.stringify(blogs, null, 2));
  res.json(blogs);
});

app.post('/api/blogs', async (req, res) => {
  try {
    const blog = await Blog.create(req.body);
    return res.json(blog);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

app.delete('/api/blogs/:id', async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id);
    await blog.destroy();  
    res.json(blog);
  } catch (error) {
    return res.status(400).json({ error });
  }
});


const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
