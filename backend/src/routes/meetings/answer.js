const Room = require('../../models/Room');
const Meeting = require('../../models/Meeting');
const io = require('../../socket');

module.exports = async (req, res) => {
  let room;
  let meeting;

  if (!req.fields.room) {
    return res.status(400).json({ status: "error", room: "room id required", message: "room id required" });
  }

  if (!req.fields.meeting) {
    return res.status(400).json({ status: "error", meeting: "meeting id required", message: "meeting id required" });
  }

  room = await Room.findById(req.fields.room);
  meeting = await Meeting.findById(req.fields.meeting).populate('caller').populate('room').populate('callee');

  meeting.declined = [...meeting.accepted, req.user.id];

  const socket = io.get();

  for (let member of meeting.access) {
    socket.to(member.toString()).emit('answer', { meeting, room, userID: req.user.id });
  }

  res.status(200).json({ status: "ok", meeting, room });
};
