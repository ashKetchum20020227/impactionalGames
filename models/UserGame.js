const mongoose = require("mongoose")

const UserGameSchema = new mongoose.Schema({
    name: {
        type: String
    },
    tournamentType: {
        type: String
    },
    status: {
        type: String
    },
}, {timestamps: true});

module.exports = mongoose.model("UserGame", UserGameSchema);