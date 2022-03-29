const Event = require('../../models/Event');
const Meeting = require('../../models/Meeting');
const io = require('../../socket');

module.exports = async (req, res) => {
  const { title, date, type, members } = req.fields;

  let meeting;

  if (type === 'meeting') {
    try {
      meeting = new Meeting({ access: [...(members || []), req.user.id], isCall: false});
      await meeting.save();
    } catch (e) {
      return res.status(500).json({ status: 'error', message: 'could not create meeting' });
    }
  }

  let event;

  try {
    event = new Event({ title, date, type, members: [...(members || []), req.user.id] });
    event.meeting = meeting;
    await event.save();
  } catch (e) {
    return res.status(500).json({ status: 'error', message: 'could not create event' });
  }

  res.status(200).json({ status: "ok" });
};
