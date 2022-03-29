const media = require('../../media');
const { Socket } = require('../../models');

module.exports = async (req, res) => {
  const { routerId, sessionId } = req.fields;

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

  try {
    const { params } = await media.createWebRtcTransport({ routerId, sessionId, type: 'consumer' });

    res.status(200).json(params);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
