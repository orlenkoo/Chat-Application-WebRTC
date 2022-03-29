const {
  createWorker,
} = require("mediasoup");
const { MediaWorker } = require('../models');
const config = require('../../config');

const media = {
  init: null,
  createWebRtcTransport: null,
  createConsumer: null,
  createRouter: null,
  worker: null,
  router: null,
};

media.init = async () => {
  global.worker = await createWorker({
    logLevel: 'warn',
    logTags: ['info', 'ice', 'dtls', 'rtp', 'srtp', 'rtcp'],
    rtcMinPort: 20000,
    rtcMaxPort: 20300,
  });

  global.worker.on('died', () => {
    console.error('mediasoup worker died, exiting in 2 seconds... [pid:%d]', worker.pid);
    setTimeout(() => process.exit(1), 2000);
  });

  media.worker = new MediaWorker({
    pid: global.worker.pid,
    target: config.ip
  });

  await media.worker.save();

  global.routers = {};
  global.producers = {};
  global.consumers = {};
};

media.createWebRtcTransport = require('./createWebRtcTransport');
media.createConsumer = require('./createConsumer');
media.createRouter = require('./createRouter');

module.exports = media;
