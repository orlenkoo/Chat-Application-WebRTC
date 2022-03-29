const Meeting = require('../../models/Meeting');

module.exports = async (req, res) => {
  let meeting;

  if (!req.fields.meetingID) {
    return res.status(400).json({ status: "error", room: "meeting id required", message: "meeting id required" });
  }

  meeting = await Meeting.findById(req.fields.meetingID).populate('caller').populate('room').populate('callee').lean();

  res.status(200).json({ status: "ok", meeting });
};
