const media = require('../../media');
const { Meeting, MediaRouter } = require('../../models');

module.exports = async (req, res) => {
  const { meetingId, sessionId } = req.fields;

  if (!meetingId) {
    return res.status(400).json({ message: 'meeting id required' });
  }

  if (!sessionId) {
    return res.status(400).json({ message: 'session id required' });
  }

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
    meeting = await Meeting.findByIdAndUpdate(meetingId, { $addToSet: { members: [req.user.id] } });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ message: 'could not add user to meeting' });
  }

  try {
    meeting = await Meeting.findById(meetingId).populate('router').populate('producers');
  } catch (e) {
    console.log(e);
    return res.status(400).json({ message: 'could not populate producers' });
  }

  res.status(200).json({ message: 'success', router: meeting.router, meeting, producers: meeting.producers })
};
