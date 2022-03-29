const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const SessionSchema = new Schema({
    expires: {
        type: Date,
        default: Date.now(),
    },
    user: {
        type: ObjectId,
        ref: 'User',
        required: true,
    },
    shield: {
        type: String,
        required: true,
    },
    signature: {
        type: String,
        required: false,
    },
});

const Session = mongoose.model('Session', SessionSchema);

module.exports = Session;
