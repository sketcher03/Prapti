const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    buyerId: { //user_id
        type: String,
        required: true,
    },
    sellerId: { //user_id
        type: String,
        required: true,
    },
    projectId: { //project_id
        type: String,
        required: true,
    },
    price: { 
        type: Number,
        required: true,
    },
    requirements: [
        {
            req_title: {
                type: String,
            },
            req_type: {
                type: String,
            },
        }
    ],
    timeline: {
        type: Number, //in days
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    deliveredAt: {
        type: Date,
    },
    modifiedPrice: [
        {
            price: {
                type: Number,
            },
            reason: {
                type: String,
            },
            added_time: {
                type: Number, //in days
            },
            createdAt: {
                type: Date,
                default: Date.now(),
            }
        }
    ],
    isCancelled: {
        type: Boolean,
    },
    tip: {
        type: Number,
    }
})

module.exports = mongoose.model('order', orderSchema);