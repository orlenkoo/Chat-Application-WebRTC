const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const LogSchema = new Schema({
  timestamp: {
    type: Date,
    default: Date.now,
  },
  key: {
    type: String,
    default: 'generic',
  },
  thumbnail: {
    type: Boolean,
    default: false,
  },
  user: {
    type: ObjectId,
    ref: 'User',
  },
  shield: {
    type: ObjectId,
    ref: 'Shield',
  },
  file: {
    type: ObjectId,
  },
  size: {
    type: Number,
  },
  version: {
    type: String,
  },
  build: {
    type: Number,
  },
});

const Log = mongoose.model('Log', LogSchema);

module.exports = Log;
