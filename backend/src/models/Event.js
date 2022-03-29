const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const EventSchema = new Schema({
  type: {
    type: String,
    default: 'offline',
  },
  members: [{ // users who have this event in their calendar
    type: ObjectId,
    ref: 'User',
  }],
  date: {
    type: Date,
    required: true,
  },
  fullDay: {
    type: Boolean,
    default: false,
  },
  meeting: {
    type: ObjectId,
    ref: 'Meeting',
  },
  title: {
    type: String,
    default: 'Event title',
  },
  description: {
    type: String,
    default: 'Event title',
  },
});

const Room = mongoose.model('Event', EventSchema);

module.exports = Room;
