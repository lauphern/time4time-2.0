const express = require('express');
const router = express.Router();

const { usersCollection, offersCollection } = require("../../utils/db")

router.post('/apply', function(req, res, next) {
    offersCollection.doc(req.body.offerId).get()
    .then( offerSnap => {
        let offerId = offerSnap.id
        res.offer = { offerId, ...offerSnap.data() }
        next()
    })
    .catch(() => {
        res.json({message: "Could not apply to the offer"});
    })
})

router.post('/apply', function(req, res, next) {
    usersCollection.doc(req.session.user.id).get()
    .then( userSnap => {
        let userId = userSnap.id
        let user = { userId, ...userSnap.data() }
        if( user.timeWallet < res.offer.duration ) {
            res.json({message: "Not enough time in the wallet to apply"})
        }
        else if(user.timeWallet >= offer.duration) {
            next()
        }
    })
    .catch(() => {
        res.json({message: "Could not apply to the offer"});
    })
})

router.post('/apply', function(req, res, next) {
    res.offer.userRequest = req.session.user.username
    res.offer.status = 'Pending'
    //TODO revisar que puedo hacer update en este objeto
    offerSnap.set(
        res.offer,
        { merge: true }
    )
    .then(() => {
        res.end()
    })
    .catch(() => {
        res.json({message: "Could not apply to the offer"});
    })
})

module.exports = router;