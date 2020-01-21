const express = require('express');
const router = express.Router();
const moment = require('moment')
moment().format()

const { offersCollection } = require("../../utils/db")

router.get('/fetch-offers', function(req, res) {
    offersCollection.where("status", "==", "Open").get()
    .then( snap => {
        let allOffers = []
        snap.docs.forEach(doc => {
            let { id } = doc
            allOffers.push({id, ...doc.data()})
        })
        res.json(allOffers)
    })
    .catch(() => {
        res.status(404).json({errorMessage: "Offers not found"})
    })
})

module.exports = router;