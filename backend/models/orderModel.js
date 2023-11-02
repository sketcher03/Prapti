const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    buyerId: { //user_id
        type: String,
        required: true,
    },
    buyerUsername: { //user.username
        type: String,
        required: true,
    },
    sellerId: { //user_id
        type: String,
        required: true,
    },
    sellerUsername: { //user.username
        type: String,
        required: true,
    },
    projectId: { //project_id
        type: String,
        required: true,
    },
    description: {
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
            req_content: {
                type: String,
            }
        }
    ],
    timeline: {
        type: Date, //in days
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    isDelivered: {
        type: Boolean,
        default: false,
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