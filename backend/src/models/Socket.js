const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const SocketSchema = new Schema({
  socket: String,
  user: {
    type: ObjectId,
    ref: 'User',
    required: true,
  },
  status: String,
  lastActive: Date,
});

const Socket = mongoose.model('Socket', SocketSchema);

module.exports = Socket;
