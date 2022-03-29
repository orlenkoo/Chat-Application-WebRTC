const stats = require("../../dao/stats");

module.exports = async (req, res) => {
  let result = await stats.getTransfer();

  res.status(200).json(result);
};
