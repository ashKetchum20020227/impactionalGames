
const mongoose = require("mongoose")

const RefreshTokenSchema = new mongoose.Schema({
    refreshToken: {
        type: String
    },
    expireAt: {
        type: Date,
        default: Date.now,
        expires: 86400,
    },
}, 
{ timestamps: true }
);

module.exports = mongoose.model("RefreshToken", RefreshTokenSchema);