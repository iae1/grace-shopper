const router = require('express').Router();
const { requireToken, isAdmin } = require('./gatekeeping');
const {
  models: { User },
} = require('../db');
module.exports = router;

router.get('/', requireToken, isAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll({});
    res.json(users);
  } catch (err) {
    next(err);
  }
});
