const Room = require('../../models/Room');
const Message = require('../../models/Message');

module.exports = async (req, res) => {
  let room;

  if (!req.fields.user) {
    return res.status(400).json({ status: "error", user: "user required", message: "user required" });
  }

  room = await Room.findOne({
    members: { $all: [req.user.id, req.fields.user] },
    isGroup: false,
  }).populate('lastAuthor').populate('lastMessage').populate('members');

  if (!room) {
    room = new Room({
      members: [req.user.id, req.fields.user],
      access: [req.user.id, req.fields.user],
    });
    await room.save();
    room = await Room.findById(room._id).populate('lastAuthor').populate('lastMessage').populate('members');

    const message = new Message({
      content: 'created',
      author: req.user.id,
      room: room._id,
      members: room.members,
      access: room.access,
      type: 'system',
    });
    await message.save();

    room.lastUpdate = Date.now();
    room.lastMessage = message;
    await room.save();
  }

  res.status(200).json({ status: "ok", room });
};
