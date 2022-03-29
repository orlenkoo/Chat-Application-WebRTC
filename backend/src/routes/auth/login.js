const router = require('express').Router();
const User = require('../../models/User');
const config = require('../../../config');
const secret = config.secret || 'default secret';
const jwt = require('jsonwebtoken');
const isEmpty = require('../../utils/isEmpty');
const argon2 = require('argon2');
const { findUserByUsername, findUserByEmail } = require('../../dao/users');
const { isEmail } = require('validator');

router.post('*', async (req, res) => {
  let { username, password } = req.fields;

  if (isEmpty(username)) return res.status(400).json({
    status: 'error',
    message: 'username required',
    username: 'username required'
  });

  username = username.toLowerCase();

  let user;

  try {
    if (isEmail(username)) {
      user = await findUserByEmail(username);
    } else {
      user = await findUserByUsername(username);
    }
  } catch (e) {
    return res.status(500).json({ status: 'error', message: 'database read error' });
  }

  if (!user) return res.status(400).json({ status: 'error', message: 'user not found', username: 'user not found' });

  if (isEmpty(password)) return res.status(400).json({
    status: 'error',
    message: 'password required',
    password: 'password required'
  });

  argon2.verify(user.password, password).then(async valid => {
    if (valid) {
      user.lastLogin = Date.now();
      await user.save();
      jwt.sign(
        {
          id: user._id,
          username: user.username,
          email: user.email,
          name: `${user.firstName} ${user.lastName}`,
          firstName: user.firstName,
          lastName: user.lastName,
          roles: user.roles,
          lastLogin: user.lastLogin
        }, secret,
        { expiresIn: Number.MAX_SAFE_INTEGER },
        (err, token) => {
          if (err) return res.status(500).json({ status: 'error', message: 'error signing token' });
          res.status(200).json({ status: 'ok', token });
        }
      );
    } else res.status(400).json({ status: 'error', message: 'wrong password', password: 'wrong password' });
  });
});

module.exports = router;
