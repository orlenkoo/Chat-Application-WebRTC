const { findUserById } = require("../../dao/users");

module.exports = async (req, res) => {
  const { id } = req.fields;

  let user, result;

  try {
    user = await findUserById(id);
  } catch (e) {
    return res.status(500).json({ status: 'error', message: 'database read error' });
  }

  if (!user) {
    return res.status(404).json({ status: 'error', message: 'user not found' });
  }

  try {
    result = await user.delete();
  } catch (e) {
    return res.status(500).json({ status: 'error', message: 'database write error' });
  }

  res.status(200).json({ status: "success", result });
};
