const Note = require('./note');
const User = require('./user');
const Blog = require('./blog');
const Team = require('./team');
const Membership = require('./membership');
const UserNotes = require('./user_notes');
const Readinglist = require('./readinglist');

User.hasMany(Note);
Note.belongsTo(User);

User.hasMany(Blog);
Blog.belongsTo(User);

User.belongsToMany(Team, { through: Membership });
Team.belongsToMany(User, { through: Membership });

User.belongsToMany(Note, { through: UserNotes, as: 'markedNotes' });
Note.belongsToMany(User, { through: UserNotes, as: 'usersMarked' });

User.belongsToMany(Blog, { through: Readinglist, as: 'readings' });
Blog.belongsToMany(User, { through: Readinglist, as: 'blog_user_readings' });

module.exports = {
  Note,
  Blog,
  User,
  Team,
  Membership,
  UserNotes,
  Readinglist,
};
