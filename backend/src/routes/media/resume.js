const { Meeting, Socket } = require('../../models');
const io = require('../../socket');
const media = require('../../media');

module.exports = async (req, res) => {
  const { routerId, sessionId, consumerId } = req.fields;

  if (!routerId) {
    return res.status(400).json({ message: 'media router id required' });
  }

  if (!sessionId) {
    return res.status(400).json({ message: 'session id required' });
  }

  if (!consumerId) {
    return res.status(400).json({ message: 'consumer id required' });
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

  try {
    await global.consumers[consumerId].resume();
  } catch (e) {
    return res.status(400).json({ message: 'error while resuming' });
  }

  res.status(200).json({ message: 'resume complete' });
};
