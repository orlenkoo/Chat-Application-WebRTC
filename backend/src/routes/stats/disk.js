const stats = require("../../dao/stats");
const shield = require("../../dao/shield");

module.exports = async (req, res) => {
  const dbStats = await stats.getOverall();

  let result = {};

  result.diskSize = dbStats.fsTotalSize;
  result.availableSize = dbStats.fsTotalSize - dbStats.fsUsedSize;

  res.status(200).json(result);
};
