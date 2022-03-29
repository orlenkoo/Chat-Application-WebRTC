const { insertUser, findUserByUsername, findUserByEmail } = require("../../dao/users");
const argon2 = require('argon2');
const isEmpty = require('../../utils/isEmpty');
const validator = require('validator');

module.exports = async (req, res) => {
  let { firstName, lastName, username, email, address, password, roles, tenant } = req.fields;

  let user;

  let errors = {};
  if (isEmpty(username)) errors.username = "username required";
  if (isEmpty(email)) errors.email = "email required";
  if (isEmpty(firstName)) errors.firstName = "first name required";
  if (isEmpty(password)) errors.password = "password required";
  if (isEmpty(lastName)) errors.lastName = "last name required";
  if (Object.keys(errors).length > 0) return res.status(400).json({ status: "error", ...errors });

  if(!validator.isEmail(email)) return res.status(400).json({ status: "error", email: "invalid email"});

  email = email.toLowerCase();

  const isUsername = await findUserByUsername(username);
  if (isUsername) errors.username = "username taken";

  const isEmail = await findUserByEmail(email);
  if (isEmail) errors.email = "email already in use";

  if (Object.keys(errors).length > 0) return res.status(400).json({ status: "error", ...errors });

  try {
    user = await insertUser({
      firstName,
      lastName,
      username,
      email,
      address,
      password: await argon2.hash(password),
      roles: roles || ['standard'],
      tenant,
    });
  } catch (e) {
    return res.status(500).json({ status: 'error', message: 'database write error' });
  }

  res.status(200).json({ status: "success", user });
};
