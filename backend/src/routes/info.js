const pkg = require('../../package.json');
const config = require('../../config');

module.exports = (req, res) => {
  res.status(200).json({
    version: config.appVersion,
    build: config.appBuild,
  });
};
