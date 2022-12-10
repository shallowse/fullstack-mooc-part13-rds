const router = require('express').Router();
const { tokenExtractor } = require('../util/middleware');
const { User, Session } = require('../models');

router.get('/', tokenExtractor, async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id);
  if (!user) {
    return res.status(404).json({ error: 'user not found' });
  }

  const session = await Session.findOne({
    where: {
      token: req.encodedToken,
    },
  });

  if (!session) {
    return res.status(404).json({ error: 'user token not found' });
  }

  await session.destroy();

  res.status(200).json({ message: 'logout complete' });
});

module.exports = router;
