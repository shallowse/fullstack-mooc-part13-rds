const Note = require('./note');
const User = require('./user');
const Blog = require('./blog');

User.hasMany(Note);
Note.belongsTo(User);

User.hasMany(Blog);
Blog.belongsTo(User);

module.exports = {
  Note,
  Blog,
  User,
};
