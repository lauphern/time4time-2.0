var express = require('express');
var router = express.Router();
var User = require('../../models/User')
var Review = require('../../models/Review')


router.get('/my-profile', function(req, res, next) {
    User.findById(req.session.user._id)
      .then((profileInfo) => {
          res.json(profileInfo)
      })
      .catch((err) => {
          res.status(404).json({errorMessage: "Personal information not found"})
      })
})
  

router.get('/my-reviews', function(req, res, next) {
    Review.find({userReviewed: req.session.user._id})
      .then((myReviews) => {
          res.json(myReviews)
      })
      .catch((err) => {
          res.status(404).json({errorMessage: "Your reviews could not be found"})
      })
})
  

module.exports = router;