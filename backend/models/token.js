const mongoose = require('mongoose');
const crypto = require("crypto");

const Schema = mongoose.Schema;

const tokenSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "user",
        unique: true
    },
    token: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        expires: 3600
    }
})

tokenSchema.statics.createToken = async function (user) {
    
    const token = {
        userId: user._id,
        token: crypto.randomBytes(32).toString("hex")
    };

    const newToken = await this.create(token);

    return newToken;
}

module.exports = mongoose.model('token', tokenSchema);