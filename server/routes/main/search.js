const express = require('express');
const router = express.Router();

const { offersCollection } = require("../../utils/db")

router.post('/search', function(req, res) {
    const { house, technology, music, repair, languages, cooking } = req.body
    offersCollection.where("category", "in", [house, technology, music, repair, languages, cooking]).where("status", "==", "Open").get()
    .then(snap => {
        let filteredOffers = []
        snap.docs.forEach(doc => {
            let { id } = doc
            filteredOffers.push({id, ...doc.data()})
        })
        res.json(filteredOffers)
    })
    .catch((err) => {
        res.status(404).json({errorMessage: "Offers not found"})
    })
})

module.exports = router;