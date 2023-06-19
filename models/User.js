const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    blocked: {
        type: String,
        default: "0"
    },
    phone: {
        type:String,
        unique: true
    },
    refreshToken: {
        type: String
    },
    reviews: {
        type: Array,
        default: []
    },
    likedGames: {
        type: Array,
        default: []
    },
    history: {
        type: Array,
        default: []
    },
    profileLikes: {
        type: Array,
        default: []
    }
}, 
{ timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);