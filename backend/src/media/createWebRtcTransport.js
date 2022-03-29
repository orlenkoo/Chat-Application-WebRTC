const config = require('../../config');

const options = {
  webRtcTransport: {
    listenIps: [
      {
        ip: config.ip,
        announcedIp: null,
      }
    ],
    maxIncomingBitrate: 1500000,
    initialAvailableOutgoingBitrate: 1000000,
  },
}

const createWebRtcTransport = async ({ routerId, sessionId, type = 'generic' }) => {
  const {
    maxIncomingBitrate,
    initialAvailableOutgoingBitrate
  } = options.webRtcTransport;

  const transport = await global.routers[routerId].createWebRtcTransport({
    listenIps: options.webRtcTransport.listenIps,
    enableUdp: !!options.enableUdp,
    enableTcp: true,
    preferUdp: !!options.enableUdp,
    initialAvailableOutgoingBitrate,
  });

  if (maxIncomingBitrate) {
    try {
      await transport.setMaxIncomingBitrate(maxIncomingBitrate);
    } catch (error) {
    }
  }

  if (!global.transports) global.transports = {};
  if (!global.transports[type]) global.transports[type] = {};

  global.transports[type][sessionId] = transport;

  return {
    transport,
    params: {
      id: transport.id,
      iceParameters: transport.iceParameters,
      iceCandidates: transport.iceCandidates,
      dtlsParameters: transport.dtlsParameters
    },
    transportId: transport.id,
  };
}

module.exports = createWebRtcTransport;
