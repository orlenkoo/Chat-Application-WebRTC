const shield = require("../../dao/shield");

module.exports = async (req, res) => {
  let result = await shield.findShieldsWithOwner({}, {_id: -1}, 6);

  res.status(200).json(result);
};
