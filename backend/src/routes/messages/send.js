const Room = require('../../models/Room');
const Message = require('../../models/Message');
const User = require('../../models/User');
const io = require('../../socket');
const webpush = require('web-push');
const config = require('../../../config');

module.exports = async (req, res) => {
  let room;

  if (!req.fields.room) {
    return res.status(400).json({ status: "error", user: "room id required", message: "room id required" });
  }

  room = await Room.findById(req.fields.room);

  let message;

  message = new Message({
    content: req.fields.content,
    author: req.user.id,
    room: room._id,
    members: room.members,
    access: room.access,
    type: req.fields.type || 'text',
    files: req.fields.files,
  });
  await message.save();

  room.lastUpdate = Date.now();
  room.lastMessage = message;
  await room.save();

  message = await Message.findById(message._id).populate('author').populate('files');

  const socket = io.get();

  for (let member of message.members) {
    socket.to(member.toString()).emit('message', { message, room });

    const user = await User.findById(member);

    if (config.webPushContact && config.publicVapidKey && config.privateVapidKey) {
      if (user.subscription) {
        const payload = JSON.stringify({
          title: 'Message from @' + req.user.username,
          body: message.type === 'text' ? message.content : 'Sent a file.',
        })

        webpush.sendNotification(user.subscription, payload)
          .then(result => console.log(result))
          .catch(e => console.log(e.stack))
      }
    }
  }

  res.status(200).json({ status: "ok", message, room });
};
