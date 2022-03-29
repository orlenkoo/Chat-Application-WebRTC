const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const MessageSchema = new Schema({
    members: [{
        type: ObjectId,
        ref: 'User',
    }],
    deleted: {
        type: Boolean,
        default: false,
    },
    delivered: [{
        type: ObjectId,
        ref: 'User',
    }],
    seen: [{
        type: ObjectId,
        ref: 'User',
    }],
    author: {
        type: ObjectId,
        ref: 'User',
    },
    content: String,
    type: String,
    files: [{
        type: ObjectId,
        ref: 'Shield',
    }],
    room: {
        type: ObjectId,
        ref: 'Room',
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

const Message = mongoose.model('Message', MessageSchema);

module.exports = Message;
