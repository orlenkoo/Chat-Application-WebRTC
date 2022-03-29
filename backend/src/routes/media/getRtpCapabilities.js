const media = require('../../media');
const { Meeting, MediaRouter } = require('../../models');

module.exports = async (req, res) => {
  const { meetingId } = req.fields;

  let meeting;

  try {
    meeting = await Meeting.findById(meetingId);
  } catch (e) {
    console.log(e);
    return res.status(400).json({ message: 'specified meeting is invalid' });
  }

  if (!meeting) {
    return res.status(400).json({ message: 'specified meeting is invalid' });
  }

  if (meeting.router && !global.routers[meeting.router.toString()]) {
    await MediaRouter.deleteOne({ _id: meeting.router });
    meeting.router = null;
  }

  if (!meeting.router) {
    const router = await media.createRouter();
    meeting.router = router._id;
    await meeting.save();
  }

  try {
    meeting = await Meeting.findById(meetingId).populate('router');
  } catch (e) {
    console.log(e);
    return res.status(400).json({ message: 'specified meeting is invalid' });
  }

  res.status(200).json({ message: 'media router capabilities', meeting, rtpCapabilities: global.routers[meeting.router._id.toString()].rtpCapabilities });
};
