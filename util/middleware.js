const jwt = require('jsonwebtoken');
const { SECRET } = require('./config');
const { User, Session } = require('../models');

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    console.log(authorization.substring(7));
    req.encodedToken = authorization.substring(7);
    req.decodedToken = jwt.verify(authorization.substring(7), SECRET);
  } else {
    return res.status(401).json({ error: 'token missing' });
  }
  next();
};

const isValidUser = async (req, res, next) => {
  // Is the session in the 'sessions' table?
  const session = await Session.findOne({
    where: {
      token: req.encodedToken,
    },
  });

  if (!session) {
    return res.status(404).json({ error: 'Not valid, token not found' });
  }

  // Is the user disabled?
  const user = await User.findByPk(req.decodedToken.id);
  if (!user) {
    return res.status(404).json({ error: 'Not valid, user not found' });
  }

  if (user.disabled) {
    await session.destroy(); 
    return res.status(401).json({ error: 'Not valid, user disabled, contact admin' });
  }

  next();
};

module.exports = {
  tokenExtractor,
  isValidUser,
};
