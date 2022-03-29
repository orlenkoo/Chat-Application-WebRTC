const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const MeetingSchema = new Schema({
    members: [{ // users who are currently in the meeting - removed when exit from meeting
        type: ObjectId,
        ref: 'User',
    }],
    producers: [{
        type: ObjectId,
        ref: 'Producer',
    }],
    consumers: [{
        type: String,
    }],
    router: {
        type: ObjectId,
        ref: 'MediaRouter',
    },
    attendees: [{ // users who have joined the meeting - can only add
        type: ObjectId,
        ref: 'User',
    }],
    presenters: [{ // users who can manage others - can be added or removed
        type: ObjectId,
        ref: 'User',
    }],
    access: [{ // users who can join the meeting if set to private
        type: ObjectId,
        ref: 'User',
    }],
    private: {
        type: Boolean,
        default: false,
    },
    guests: [{ // users who have been invited to the meeting - can only add
        type: Object,
    }],
    room: { // associated messaging room - can change during the meeting
        type: ObjectId,
        ref: 'Room',
    },
    sourceRoom: { // if started as call, this is the source room - at the beginning of the call, this is equal to room
        type: ObjectId,
        ref: 'Room',
    },
    lastJoin: Date,
    owner: {
        type: ObjectId,
        ref: 'User',
    },
    routers: [{
        type: ObjectId,
        ref: 'MediaRouter',
    }],
    isCall: {
        type: Boolean,
        default: false,
    },
    requestVideo: {
        type: Boolean,
        default: false,
    },
    caller: {
        type: ObjectId,
        ref: 'User',
    },
    callee: [{
        type: ObjectId,
        ref: 'User',
    }],
    accepted: [{ // users who accepted
        type: ObjectId,
        ref: 'User',
    }],
    declined: [{ // users who declined
        type: ObjectId,
        ref: 'User',
    }],
});

const Room = mongoose.model('Meeting', MeetingSchema);

module.exports = Room;
