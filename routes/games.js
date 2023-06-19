require('dotenv').config()

const router = require("express").Router()
const Game = require("../models/Game")
const User = require("../models/User")
const Comment = require("../models/Comment")

router.post("/getGame", async (req, res) => {
    try {
        const game = await Game.findById(req.body.gameId)

        if (!game) {
            res.status(404).json("Game not found")
            return;
        }

        res.status(200).json(game)

    } catch(err) {
        res.status(500).json("Error")
    }
})

router.post("/getAllGames", async (req, res) => {
    try {

        const games = await Game.find()

        res.status(200).json(games)

    } catch(err) {
        res.status(500).json("Error")
    }
})

router.post("/add", async (req, res) => {
    try {
        const newGame = new Game({
            name: req.body.name,
            iframeLink: req.body.iframeLink,
            about: req.body.about,
            owner: req.body.owner
        })

        await newGame.save()
        res.status(200).json("Success")
    } catch(err) {
        res.status(500).json("Error")
    }
})

router.post("/like", async (req, res) => {
    try {
        const game = await Game.findById(req.body.gameId)
        const user = await User.findById(req.body.userId)

        if (game.likes.includes(req.body.userId)) {
            await game.updateOne({$pull: {likes: req.body.userId}})
            await user.updateOne({$pull: {likedGames: {gameId: req.body.gameId}}})
            const updatedUser = await User.findById(req.body.userId)
            res.json({_id: updatedUser._id, username: updatedUser.username, email: updatedUser.email, phone: updatedUser.phone, likedGames: updatedUser.likedGames, history: updatedUser.history,  profileLikes: updatedUser.profileLikes, accessToken: updatedUser.accessToken, refreshToken: updatedUser.refreshToken});
            return
        }

        const likedGame = {
            gameId: req.body.gameId,
            name: game.name,
            iframeLink: game.iframeLink
        }

        await game.updateOne({$push: {likes: req.body.userId}})
        await user.updateOne({$push: {likedGames: likedGame}})

        await game.save()
        await user.save()

        user.likedGames.push(likedGame)

        res.json({_id: user._id, username: user.username, email: user.email, phone: user.phone, likedGames: user.likedGames, history: user.history, profileLikes: user.profileLikes, accessToken: user.accessToken, refreshToken: user.refreshToken});

    } catch(err) {
        res.status(500).json("Error")
    }
})

module.exports = router;