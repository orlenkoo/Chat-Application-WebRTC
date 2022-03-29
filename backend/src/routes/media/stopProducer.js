const { Meeting, Producer, Socket } = require('../../models');
const io = require('../../socket');

module.exports = async (req, res) => {
  const { routerId, meetingId, sessionId, producerId } = req.fields;

  console.log('router id', routerId);
  console.log('meeting id', meetingId);
  console.log('session id', sessionId);

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

  const meeting = await Meeting.findOne({_id: meetingId});

  const socket = io.get();

  try {
    const producers = await Producer.find({ producerID: producerId }).lean();
    for (let producer of producers) {
      await Meeting.updateMany({}, { $pull: { producers: producer._id.toString() } });
      await Producer.deleteOne({ producerID: producer._id.toString() });
      global.producers[producer.id] = null;

      for (let member of meeting.members) {
        socket.to(member.toString()).emit('producer-closed', producer);
      }
    }
  } catch (e) {}

  res.status(200).json({ status: 'ok' });
};
