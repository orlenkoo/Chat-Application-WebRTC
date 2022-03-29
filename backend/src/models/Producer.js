const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const ProducerSchema = new Schema({
  userId: {
    type: ObjectId,
    ref: 'User',
  },
  meetingId: {
    type: ObjectId,
    ref: 'Meeting',
  },
  sessionId: {
    type: ObjectId,
    ref: 'Session',
  },
  producerID: {
    type: String,
    required: true,
  },
  isScreen: {
    type: Boolean,
    default: false,
  },
  kind: {
    type: String,
    default: 'video',
  },
  user: {
    type: Object,
  },
});

const Producer = mongoose.model('Producer', ProducerSchema);

module.exports = Producer;
