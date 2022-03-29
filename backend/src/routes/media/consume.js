const { Meeting, Socket } = require('../../models');
const io = require('../../socket');
const media = require('../../media');

module.exports = async (req, res) => {
  const { routerId, meetingId, sessionId, producerId, rtpCapabilities } = req.fields;

  if (!routerId) {
    return res.status(400).json({ message: 'media router id required' });
  }

  if (!sessionId) {
    return res.status(400).json({ message: 'session id required' });
  }

  if (!producerId) {
    return res.status(400).json({ message: 'producer id required' });
  }

  let session;

  try {
    session = await Socket.findById(sessionId);
  } catch (e) {
    return res.status(400).json({ message: 'specified session is invalid' });
  }

  if (!session) {
    return res.status(400).json({ message: 'specified session is invalid' });
  }

  let result, consumer, response;

  try {
    result = await media.createConsumer({
      producer: global.producers[producerId],
      rtpCapabilities,
      consumerTransport: global.transports['consumer'][sessionId],
      routerId,
    });
    consumer = result.consumer;
    response = result.response;
  } catch (e) {
    console.log(e);
    return res.status(500).json({ status: 'error' });
  }

  const closeConsumer = async () => {
    try {
      await global.transports['consumer'][sessionId].close();
    } catch (e) {}
  }

  consumer.on('transportclose', closeConsumer);
  consumer.on("producerclose", closeConsumer);

  if (!global.consumers) global.consumers = {};

  global.consumers[consumer.id] = consumer;

  res.status(200).json({ ...response });
};
