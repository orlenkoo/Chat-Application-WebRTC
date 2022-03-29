const Event = require('../../models/Event');

module.exports = async (req, res) => {
  let events = [];

  try {
    events = await Event.find({ members: { $in: [req.user.id] } });
  } catch (e) {
    return res.status(500).json({ status: 'error' });
  }

  res.status(200).json({ status: 'ok', events });
};
