const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const customOrderSchema = new Schema({
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
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    deliveredAt: {
        type: Date,
    },
    isAccepted: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        expires: 259200 //3 days -> 3 * 24 * 60 * 60 seconds
    }
})

module.exports = mongoose.model("customOrder", customOrderSchema);