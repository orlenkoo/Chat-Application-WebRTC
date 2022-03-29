const Room = require('../../models/Room');

module.exports = async (req, res) => {
  const rooms = await Room.find({ members: { $in: [req.user.id] } })
    .sort({lastUpdate: -1})
    .limit(50)
    .populate('members')
    .populate('lastAuthor')
    .populate('lastMessage');;

  res.status(200).json({ status: "ok", rooms });
};
