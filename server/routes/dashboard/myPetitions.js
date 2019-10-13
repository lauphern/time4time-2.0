var express = require('express');
var router = express.Router();
var Offer = require('../../models/Offer')

//find user request and pending status
router.get('/my-petitions', function(req, res, next) {
    let username = req.session.user.username
    Offer.find({userRequest: username})
            .then((myRequests) =>{
                res.json(myRequests)
            }) 
            .catch((err) =>{
                res.status(404).json({errorMessage: 'not found'})
            })
});

module.exports = router;