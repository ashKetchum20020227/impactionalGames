
const mongoose = require("mongoose")

const CommentSchema = new mongoose.Schema({
    gameId: {
        type: String
    },
    userId: {
        type: String
    },
    username: {
        type: String
    },
    comment: {
        type: String
    },
    likes: {
        type: Array,
        default: []
    },
    replies: {
        type: Array,
        default: []
    }
}, {timestamps: true})

module.exports = mongoose.model("Comment", CommentSchema);