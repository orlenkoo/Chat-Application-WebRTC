const Room = require('../../models/Room');
const Meeting = require('../../models/Meeting');
const io = require('../../socket');

module.exports = async (req, res) => {
  let room;

  if (!req.fields.room) {
    return res.status(400).json({ status: "error", room: "room id required", message: "room id required" });
  }

  room = await Room.findById(req.fields.room).populate('members');

  let meeting;

  meeting = new Meeting({
    caller: req.user.id,
    callee: room.members,
    access: [...room.members, req.user.id],
    sourceRoom: room._id,
    room: room._id,
    requestVideo: !!req.fields.video,
    isCall: true,
  });
  await meeting.save();

  meeting = await Meeting.findById(meeting._id).populate('caller').populate('room').populate('callee').lean();

  const socket = io.get();

  for (let member of meeting.access) {
    socket.to(member.toString()).emit('call', { meeting, room });
  }

  res.status(200).json({ status: "ok", meeting, room });
};
