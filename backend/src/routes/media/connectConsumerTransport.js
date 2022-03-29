const media = require('../../media');
const { Socket } = require('../../models');

module.exports = async (req, res) => {
  const { routerId, sessionId, dtlsParameters } = req.fields;

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

  global.transports['consumer'][sessionId].connect({ dtlsParameters });

  res.status(200).json({ message: 'transport connected' });
};
