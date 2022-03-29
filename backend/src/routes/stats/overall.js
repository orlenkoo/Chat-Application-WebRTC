const stats = require("../../dao/stats");
const shield = require("../../dao/shield");

module.exports = async (req, res) => {
  const dbStats = await stats.getOverall();

  let result = {};

  result.indexSize = dbStats.indexSize;
  result.objectsOrChunks = dbStats.objects;

  res.status(200).json(result);
};
