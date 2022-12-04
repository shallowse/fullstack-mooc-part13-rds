const Note = require('./note');
const User = require('./user');
const Blog = require('./blog');

User.hasMany(Note);
Note.belongsTo(User);

User.sync({ alter: true });
Note.sync({ alter: true });
Blog.sync({ alter: true });

module.exports = {
  Note,
  Blog,
  User,
};
