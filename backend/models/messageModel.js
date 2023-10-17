const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const messageSchema = new Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    isRead: {
        type: Boolean,
        default: false,
    },
    chat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "chat"
    },
    text: {
        type: String,
    },
    file: {
        type: String,
    },
}, { timestamps: true })

module.exports = mongoose.model('message', messageSchema);