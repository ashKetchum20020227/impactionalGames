require('dotenv').config()

const router = require("express").Router()
const Game = require("../models/Game")
const User = require("../models/User")
const Comment = require("../models/Comment")

router.post("/all", async (req, res) => {
    try {
        const comments = await Comment.find({gameId: req.body.gameId})
        // console.log(req.body.gameId);
        // console.log(comments);
        res.status(200).json(comments)
    } catch(err) {
        console.log(err)
        res.status(500).json("Error")
    }
})

router.post("/addComment", async (req, res) => {
    try {

        const comment = new Comment({
            gameId: req.body.gameId,
            userId: req.body.userId,
            comment: req.body.comment,
            username: req.body.username
        })

        await comment.save()

        const comments = await Comment.find({gameId: req.body.gameId})

        res.status(200).json(comments)

    } catch(err) {
        res.status(500).json("Error")
    }
})

router.post("/likeComment", async (req, res) => {
    try {
        const comment = await Comment.findById(req.body.commentId)

        if (comment.likes.includes(req.body.userId)) {

            await comment.updateOne({$pull: {likes: req.body.userId}})

            await comment.save()

            const comments = await Comment.find({gameId: req.body.gameId})
            
            res.status(200).json(comments)

            return
        }

        await comment.updateOne({$push: {likes: req.body.userId}})

        await comment.save()

        const comments = await Comment.find({gameId: req.body.gameId})
            
        res.status(200).json(comments)

    } catch(err) {
        console.log(err);
        res.status(500).json("Error")
    }
})

router.post("/replyComment", async (req, res) => {
    try {
        const comment = await Comment.findById(req.body.commentId)

        const newReply = {
            userId: req.body.userId,
            username: req.body.username,
            comment: req.body.comment,
            date: new Date()
        }

        await comment.updateOne({$push: {replies: newReply}})

        await comment.save()

        const comments = await Comment.find({gameId: req.body.gameId})

        res.status(200).json(comments)

    } catch(err) {
        console.log(err);
        res.status(500).json("Error")
    }
})

module.exports = router;