const { boolean } = require('joi');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const projectSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    category: [
        {
            type: String,
        }
    ],
    pictures: [
        {
            type: String,
            required: true
        }
    ],
    priceTiers:[
        {
            tier_title: {
                type: String,
            },
            tier_price: {
                type: Number,
            },
            tier_description: {
                type: String,
            },
            tier_deliverables: {
                type: String,
            },
            tier_timeline: {
                type: Number,
            }
        }
    ],
    requirements:[
        {
            req_title: {
                type: String,
            },
            req_type: {
                type: String,
            },
        }
    ],
    description: {
        type: String,
    },
    deliverables: [
        {
            type: String,
        }
    ],
    user_id: {
        type: String,
        required: true
    },
    verified: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    isApproved: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('project', projectSchema);