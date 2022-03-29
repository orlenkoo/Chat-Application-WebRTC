const { findUserById, findUserByUsername, findUserByEmail } = require("../../dao/users");
const argon2 = require('argon2');
const isEmpty = require('../../utils/isEmpty');
const validator = require('validator');

module.exports = async (req, res) => {
  const { id, firstName, lastName, username, email, address, password, tenant } = req.fields;

  let user, result, errors = {};

  try {
    user = await findUserById(id);
  } catch (e) {
    return res.status(500).json({ status: 'error', message: 'database read error' });
  }

  if (!user) {
    return res.status(404).json({ status: 'error', message: 'user not found' });
  }

  const isUsername = await findUserByUsername(username);
  if (isUsername) errors.username = "username taken";

  const isEmail = await findUserByEmail(email);
  if (isEmail) errors.email = "email already in use";

  if (Object.keys(errors).length > 0) return res.status(400).json({ status: "error", ...errors });

  if (!isEmpty(firstName)) user.firstName = firstName;
  if (!isEmpty(lastName)) user.lastName = lastName;
  if (!isEmpty(username)) user.username = username;
  if (!isEmpty(email) && validator.isEmail(email)) user.email = email;
  if (!isEmpty(address)) user.address = address;
  if (!isEmpty(password)) user.password = await argon2.hash(password);
  if (!isEmpty(tenant)) user.tenant = tenant;

  try {
    result = await user.save();
  } catch (e) {
    return res.status(500).json({ status: 'error', message: 'database write error' });
  }

  res.status(200).json({ status: "success", result });
};
