const stats = require("../../dao/stats");

module.exports = async (req, res) => {
  const dbStats = await stats.getOverall();

  let result = {};

  result.dataSize = dbStats.dataSize;
  result.variation = await stats.dataSizeVariation();

  res.status(200).json(result);
};
