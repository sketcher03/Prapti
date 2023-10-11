const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const chatSchema = new Schema({
    sender: {
        type: String,
        required: true,
    },
    reciever: {
        type: String,
        required: true,
    },
    type: {
        type: String, //text, media, document, etc
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    text: {
        type: String,
    },
    file: {
        type: String,
    }
})

module.exports = mongoose.model('chat', chatSchema);