require('dotenv').config()

const User = require("../models/User")
const OTP = require("../models/OTP")
const router = require("express").Router();
const bcrypt = require("bcrypt")
const nodemailer = require("nodemailer");
const axios = require("axios")
const Visit = require("../models/Visit")


router.post("/addVisit", async (req, res) => {
    try {
        // console.log(req.body)

        if (req.body.userId) {
            const updatedDoc = await Visit.findOne({ipAddress: req.body.ipAddress})
            if (updatedDoc.userId != req.body.userId) {
                await updatedDoc.updateOne({userId: req.body.userId})
                await updatedDoc.save()
                return;
            }
        }

        const newVisit = new Visit({
            userId: req.body.userId ? req.body.userId : "",
            ipAddress: req.body.ipAddress,
            place: req.body.place
        })

        await newVisit.save();
    } catch(err) {
        console.log(err);
    }
})

router.post("/getVisitsToday", async (req, res) => {
    try {
        
        const visits = await Visit.find();

        res.status(200).send(visits)

    } catch(err) {
        console.log(err);
    }
})


router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        // console.log(user);
        if (!user) {
            res.status(404).json("User not found")
            return
        }

        res.status(200).json({_id: user._id, username: user.username, email: user.email, phone: user.phone, likedGames: user.likedGames, history: user.history, profileLikes: user.profileLikes})
    } catch(err) {
        res.status(500).json(err)
    }
})

//Register a new user

router.post("/register", async function(req, res) {
    try {
        const user = await User.findOne({email: req.body.email});

        const mobileExists = await User.findOne({phone: req.body.phone})
        
        if (!user && !mobileExists) {
    
            const newUser = new User({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                phone: req.body.phone ? req.body.phone : "",
            })

            const salt = await bcrypt.genSalt(10);
            newUser.password = await bcrypt.hash(newUser.password, salt);

            await newUser.save();
            res.status(200).json("successfully registered")
        }

        else {
            res.json("This email/mobile is already registered.");
        }
    } catch(err) {
        res.json(err);
    }
});

router.post("/editUsername", async function(req, res) {

    try {
        const user = await User.findById(req.body._id);

        // console.log(req.body._id);
        // console.log(req.body.username);

        if (!user) {
            res.status(404).json("User not found")
        }

        await user.updateOne({username: req.body.username});

        await user.save()

        user.username = req.body.username

        res.status(200).json({_id: user._id, username: user.username, email: user.email, phone: user.phone, likedGames: user.likedGames, history: user.history, profileLikes: user.profileLikes, accessToken: user.accessToken, refreshToken: user.refreshToken})

    } catch(err) {
        console.log(err);
        res.json(err);
    }
});

router.post("/addReview", async function(req, res) {

    try {
        const user = await User.findById(req.body._id);

        // console.log(req.body._id);
        // console.log(req.body.username);

        if (!user) {
            res.status(404).json("User not found")
        }

        await user.updateOne({$push: {reviews: req.body.review}});

        await user.save()

        user.reviews.push(req.body.review)

        res.status(200).json({_id: user._id, username: user.username, email: user.email, phone: user.phone, likedGames: user.likedGames, history: user.history, profileLikes: user.profileLikes, accessToken: user.accessToken, refreshToken: user.refreshToken})

    } catch(err) {
        console.log(err);
        res.json(err);
    }
});

router.post("/history", async (req, res) => {
    try {
        const user = await User.findById(req.body.userId)

        const historyGame = {
            gameId: req.body.gameId, 
            name: req.body.name,
            iframeLink: req.body.iframeLink
        }

        await user.updateOne({$push: {history: historyGame}})

        await user.save()
        
        const updatedUser = await User.findById(req.body.userId)

        res.status(200).json({_id: updatedUser._id, username: updatedUser.username, email: updatedUser.email, phone: updatedUser.phone, likedGames: updatedUser.likedGames, history: updatedUser.history, profileLikes: updatedUser.profileLikes, accessToken: updatedUser.accessToken, refreshToken: updatedUser.refreshToken})

    } catch(err) {
        console.log(err);
        res.status(500).json(err)
    }
})

router.post("/likeProfile", async (req, res) => {
    try {
        const user = await User.findById(req.body.userId)

        if (user.profileLikes.includes(req.body.likeId)) {
            await user.updateOne({$pull: {profileLikes: req.body.likeId}})
            await user.save()

            const updatedUser = await User.findById(req.body.userId)
            res.status(200).json({_id: updatedUser._id, username: updatedUser.username, email: updatedUser.email, phone: updatedUser.phone, likedGames: updatedUser.likedGames, history: updatedUser.history, profileLikes: updatedUser.profileLikes, accessToken: updatedUser.accessToken, refreshToken: updatedUser.refreshToken})

            return;
        }   

        await user.updateOne({$push: {profileLikes: req.body.likeId}})

        await user.save()
        
        const updatedUser = await User.findById(req.body.userId)

        res.status(200).json({_id: updatedUser._id, username: updatedUser.username, email: updatedUser.email, phone: updatedUser.phone, likedGames: updatedUser.likedGames, history: updatedUser.history, profileLikes: updatedUser.profileLikes, accessToken: updatedUser.accessToken, refreshToken: updatedUser.refreshToken})

    } catch(err) {
        console.log(err);
    }
})

module.exports = router;