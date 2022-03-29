const Message = require('../../models/Message');

module.exports = async (req, res) => {
  if (!req.fields.room) {
    return res.status(400).json({ status: "error", user: "room id required", message: "room id required" });
  }

  const messages = await Message.find({ room: req.fields.room })
    .sort({lastUpdate: -1})
    .limit(50)
    .populate('files')
    .populate('author');

  res.status(200).json({ status: "ok", messages });
};
