const {
  types,
  version,
  observer,
  createWorker,
  getSupportedRtpCapabilities,
  parseScalabilityMode
} = require("mediasoup");
const { MediaRouter, MediaWorker } = require('../models');
const config = require('../../config');

const createRouter = async () => {
  const mediaRouter = new MediaRouter({
    pid: global.worker.pid,
    target: config.ip
  });

  await mediaRouter.save();

  const mediaWorker = await MediaWorker.findOne({ target: config.ip, pid: global.worker.pid });

  mediaWorker.routers.push(mediaRouter);

  await mediaWorker.save();

  const router = await global.worker.createRouter({ mediaCodecs: config.mediaCodecs });

  if (!global.routers) global.routers = {};

  global.routers[mediaRouter._id] = router;

  return mediaRouter.toObject();
};

module.exports = createRouter;
