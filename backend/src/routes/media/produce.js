const { Meeting, Producer, Socket } = require('../../models');
const io = require('../../socket');

module.exports = async (req, res) => {
  const { routerId, meetingId, sessionId, kind, rtpParameters, isScreen } = req.fields;

  if (!routerId) {
    return res.status(400).json({ message: 'media router id required' });
  }

  if (!sessionId) {
    return res.status(400).json({ message: 'session id required' });
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

  const producer = await global.transports['producer'][sessionId].produce({ kind, rtpParameters });

  if (!global.producers) global.producers = {};

  const socket = io.get();

  const meeting = await Meeting.findById(meetingId, {members: 1});

  global.producers[producer.id] = producer;

  const producerData = {
    userId: req.user.id,
    user: {
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      username: req.user.username,
      email: req.user.email,
    },
    meetingId: meeting ? meeting._id : 'general',
    producerID: producer.id,
    sessionId,
    isScreen,
    kind,
  };

  const producerEntry = new Producer(producerData);
  await producerEntry.save();

  const closeProducer = async () => {
    try {
      await global.transports['producer'][sessionId].close();
      await Meeting.updateMany({}, { $pull: { producers: producerEntry._id.toString() } });
      await Producer.deleteOne({ producerID: producerEntry.producerID });
      global.producers[producer.id] = null;
      for (let member of meeting.members) {
        socket.to(member.toString()).emit('producer-closed', producerEntry);
      }
    } catch (e) {}
  }

  producer.on('transportclose', closeProducer);
  producer.observer.on("close", closeProducer);

  await Meeting.findByIdAndUpdate(meetingId, { $addToSet: { producers: [producerEntry._id] } });

  for (let member of meeting.members) {
    socket.to(member.toString()).emit('producer', producerData);
  }

  res.status(200).json({ id: producer.id });
};
