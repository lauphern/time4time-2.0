var express = require('express');
var router = express.Router();
var Offer = require('../../models/Offer')
var User = require('../../models/User')

router.post('/apply', function(req, res, next) {
    let offerId = req.body.offerId;
    let userId = req.session.user._id
    let username = req.session.user.username;
    Offer.findById(offerId)
        .then((offer) => {
            User.findById(userId)
                .then((userRequest) => {
                    if( userRequest.timeWallet < offer.duration ) {
                        res.json({message: "Not enough time in the wallet to apply"})
                    }
                    else if ( userRequest.timeWallet >= offer.duration) {
                        offer.userRequest = username
                        offer.status = 'Pending'
                        offer.save((err, offerUpdated) => {
                            if(err) res.json({message: "Could not apply to the offer"});
                            else res.json(offerUpdated)
                        })
                    }
                })
                .catch(err => {
                    res.json({errorMessage: "User not found"})
                })
        })
        .catch(err => { 
            res.json({message: "Could not apply to the offer"});
        });
})



module.exports = router;