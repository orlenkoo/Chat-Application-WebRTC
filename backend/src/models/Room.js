const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const RoomSchema = new Schema({
    members: [{ // users who can send messages in the room
        type: ObjectId,
        ref: 'User',
    }],
    access: [{ // users who can see the room
        type: ObjectId,
        ref: 'User',
    }],
    admins: [{ // users who can add or remove people from members
        type: ObjectId,
        ref: 'User',
    }],
    title: String,
    picture: {
        type: String,
        required: false,
    },
    isGroup: {
        type: Boolean,
        default: false,
    },
    lastUpdate: Date,
    lastAuthor: {
        type: ObjectId,
        ref: 'User',
    },
    lastMessage: {
        type: ObjectId,
        ref: 'Message',
    },
});

const Room = mongoose.model('Room', RoomSchema);

module.exports = Room;
