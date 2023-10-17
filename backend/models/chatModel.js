const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const chatSchema = new Schema({
    users: [
        {
            type: String,
            ref: "User",
        }
    ],
    latestMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "message"
    }
}, { timestamps: true })

module.exports = mongoose.model('chat', chatSchema);