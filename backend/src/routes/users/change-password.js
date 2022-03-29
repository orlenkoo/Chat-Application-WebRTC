const { findUserById } = require("../../dao/users");
const argon2 = require('argon2');
const isEmpty = require('../../utils/isEmpty');
const validator = require('validator');

module.exports = async (req, res) => {
  const { password } = req.fields;

  let user;

  try {
    user = await findUserById(req.user.id);
  } catch (e) {
    return res.status(500).json({ status: 'error', message: 'database read error' });
  }

  if (!user) {
    return res.status(404).json({ status: 'error', message: 'user not found' });
  }


  if (!isEmpty(password)) user.password = await argon2.hash(password);

  try {
    await user.save();
  } catch (e) {
    return res.status(500).json({ status: 'error', message: 'database write error' });
  }

  user = await findUserById(req.user.id);

  res.status(200).json({ status: "success", user });
};
