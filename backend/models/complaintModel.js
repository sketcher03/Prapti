const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const complaintSchema = new Schema ({

    category: {
        type: String,
    },
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    user_id: {                                                       
        type: String,
        required: true
    },
    response: [{
        admin_id: {
            type: String,
        },
        response_text:{
            type: String,
        }
    }]

}, { timestamps: true });

module.exports = mongoose.model('Complaint', complaintSchema);