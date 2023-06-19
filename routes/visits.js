
require('dotenv').config()

const Visit = require("../models/Visit")
const router = require("express").Router();


router.post("/addVisit", async (req, res) => {
    try {
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

module.exports = router;