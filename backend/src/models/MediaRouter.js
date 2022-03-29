const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const RoomSchema = new Schema({
  target: String,
  pid: Number,
  load: {
    type: Number,
    default: 0,
  },
  peers: [String],
  consumers: [String],
  producers: [String],
});

const Room = mongoose.model('MediaRouter', RoomSchema);

module.exports = Room;
