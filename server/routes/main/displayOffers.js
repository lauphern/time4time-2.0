var express = require('express');
var router = express.Router();
var Offer = require('../../models/Offer')
var moment = require('moment')
moment().format()

router.get('/display-offers', function(req, res, next) {
  Offer.find({status:'Open'})
    .then((allOffers) => {
        res.json(allOffers)
    })
    .catch(() => {
        res.status(404).json({errorMessage: "Offers not found"})
    })
})


module.exports = router;