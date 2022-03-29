const {createModel} = require('mongoose-gridfs');
const { Log, Shield } = require("../../models");

module.exports = async (req, res) => {
  if (!req.user.roles.includes('root')) return res.status(401).json({ status: "error", message: "not authorized to purge" });

  const File = createModel();

  await Shield.deleteMany({});
  const files = await File.find({})
  for (let file of files) {
    File.unlink(file, (error) => console.log(error));
  }
  await Log.deleteMany({});

  return res.status(200).json({ status: "purged", message: "all files and shields have been permanently deleted" });
};
