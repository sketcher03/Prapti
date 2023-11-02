const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const feedbackSchema = new Schema ({

    subject: {
        type: String,
    },
    feedback: {
        type: String,
    },
    user_id: {                                                       
        type: String,
        required: true
    }

}, { timestamps: true });

module.exports = mongoose.model('Feedback', feedbackSchema);