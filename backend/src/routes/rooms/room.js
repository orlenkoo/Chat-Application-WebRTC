const Room = require('../../models/Room');
const Message = require('../../models/Message');

module.exports = async (req, res) => {
  let room;

  if (!req.fields.room) {
    return res.status(400).json({ status: "error", user: "room id required", message: "room id required" });
  }

  room = await Room.findById(req.fields.room).populate('lastAuthor').populate('lastMessage').populate('members');

  res.status(200).json({ status: "ok", room });
};
