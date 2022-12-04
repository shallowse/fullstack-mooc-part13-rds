const express = require('express');
require('express-async-errors');
const app = express();

const { PORT } = require('./util/config');
const { connectToDatabase } = require('./util/db');

const notesRouter = require('./controllers/notes');
const blogsRouter = require('./controllers/blogs');

app.use(express.json());

app.use('/api/notes', notesRouter);
app.use('/api/blogs', blogsRouter);

const errorHandler = (err, req, res, next) => {
  console.error('[ERROR HANDLER]:', err.message);
  res.status(400).json(err.message);
  next(err);
};

app.use(errorHandler);

const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();
