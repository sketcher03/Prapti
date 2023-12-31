const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const requestSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    budget: {
        type: Number,
        required: true
    },
    isApproved: {
        type: Boolean,
        default: false
    },
    timeline: {
        type: Number,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
    user_username: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Requests', requestSchema);

