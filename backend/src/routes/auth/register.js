const router = require('express').Router();
const { AuthCode, Email, User } = require('../../models');
const config = require('../../../config');
const secret = config.secret || 'default secret';
const jwt = require('jsonwebtoken');
const isEmpty = require('../../utils/isEmpty');
const argon2 = require('argon2');
const { findUserByUsername, findUserByEmail } = require('../../dao/users');
const { isEmail } = require('validator');
const moment = require('moment');

router.post('*', async (req, res) => {
  let { username, email, firstName, lastName, password, code } = req.fields;

  if (!config.registerEnabled) return res.status(500).json({
    status: 'error',
    message: 'register is not enabled in environment config',
  });

  if (isEmpty(username)) return res.status(400).json({
    status: 'error',
    message: 'username required',
    username: 'username required'
  });

  if (isEmpty(email)) return res.status(400).json({
    status: 'error',
    message: 'email required',
    email: 'email required'
  });

  if (!isEmail(email)) return res.status(400).json({
    status: 'error',
    message: 'must be a valid email',
    email: 'must be a valid email'
  });

  if (isEmpty(firstName)) return res.status(400).json({
    status: 'error',
    message: 'first name required',
    firstName: 'first name required'
  });

  if (isEmpty(lastName)) return res.status(400).json({
    status: 'error',
    message: 'last name required',
    lastName: 'last name required'
  });

  if (isEmpty(password)) return res.status(400).json({
    status: 'error',
    message: 'password required',
    password: 'password required'
  });

  if (password.length < 6) {
    return res.status(404).json({ status: 'error', password: 'password too short, must be at least 6 characters' });
  }

  username = username.toLowerCase();
  email = email.toLowerCase();

  let user, authCode;

  try {
    user = await findUserByUsername(username);
  } catch (e) {
    return res.status(500).json({ status: 'error', message: 'database read error' });
  }

  if (user) {
    return res.status(400).json({ status: 'error', message: 'username taken', username: 'username taken' });
  }

  try {
    user = await findUserByEmail(email);
  } catch (e) {
    return res.status(500).json({ status: 'error', message: 'database read error' });
  }

  if (user) {
    return res.status(400).json({ status: 'error', message: 'email already in use', email: 'email already in use' });
  }

  if (!code) {
    return res.status(404).json({ status: 'error', code: 'auth code required' });
  }

  try {
    authCode = await AuthCode.findOne({ code, user, valid: true });
  } catch (e) {
    return res.status(404).json({ status: 'error', code: 'error while reading database' });
  }

  if (!authCode) {
    return res.status(404).json({ status: 'error', code: 'auth code not found' });
  }

  const hash = await argon2.hash(password);

  user = new User({
    username,
    password: hash,
    firstName,
    lastName,
    email,
    roles: ['standard'],
    lastLogin: Date.now(),
  });

  await user.save();
  jwt.sign(
    {
      id: user._id,
      username: user.username,
      email: user.email,
      name: `${user.firstName} ${user.lastName}`,
      firstName,
      lastName,
      roles: user.roles,
      lastLogin: user.lastLogin,
    }, secret,
    { expiresIn: Number.MAX_SAFE_INTEGER },
    async (err, token) => {
      if (err) return res.status(500).json({ status: 'error', message: 'error signing token' });

      const entry = new Email({
        from: config.nodemailer.from,
        to: user.email,
        subject: `${config.appTitle || config.appName || 'Clover'} - Welcome`,
        html: `<p>Hello ${firstName},<br/><br/>Welcome to Clover! Your username is ${username}<br/><br/>Timestamp: ${moment().format('HH:mm - D MMMM YYYY')}</p>`,
      });

      await entry.save();

      res.status(200).json({ status: 'ok', token });
    }
  );
});

module.exports = router;
