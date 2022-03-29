const Room = require('../../models/Room');
const Message = require('../../models/Message');

module.exports = async (req, res) => {
  let room;

  room = new Room({
    members: [req.user.id, ...req.fields.users],
    access: [req.user.id, ...req.fields.users],
    picture: req.fields.picture,
    title: req.fields.title,
    isGroup: true,
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

  res.status(200).json({ status: "ok", room });
};
