
const mongoose = require("mongoose")

const GameSchema = new mongoose.Schema({
    name: {
        type: String
    },
    about: {
        type: String
    },
    owner: {
        type: String
    },
    release: {
        type: String
    },
    iframeLink: {
        type: String
    },
    likes: {
        type: Array,
        default: []
    }
})

module.exports = mongoose.model("Game", GameSchema);