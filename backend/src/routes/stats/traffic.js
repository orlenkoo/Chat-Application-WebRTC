const stats = require("../../dao/stats");

module.exports = async (req, res) => {
  const days = req.fields.days;

  const result = await stats.getTraffic(days || 7);

  res.status(200).json(result);
};
