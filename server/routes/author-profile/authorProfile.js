const express = require('express');
const router = express.Router();
const User = require('../../models/User')
const Review = require('../../models/Review')
// TODO do I need this now? can I combine it with the new stuff?
const multer = require("multer")
const upload = multer({ dest: 'public/images' })

router.get('/author-profile/:id', function(req, res, next) {
  //find by author id 
  let {id} = req.params;
  User.findById(id)
    .then((authorProfile) => {
      if(!authorProfile) {
        res.status(404).json({errorMessage:"user not found"})
      } else res.status(200).json(authorProfile)
    })
    .catch((err)=>{
          res.status(500).json({errorMessage: 'author data not found'});
    });
});

router.post('/author-profile', upload.single('review-image'), function(req, res, next) {
    let addReview = {
        rating: req.body.rate1,
        opinion: req.body.opinion,
        date: req.body.date,
        picture: req.file.path,
        reviewer: req.session.user._id,
    }
    Review.create(addReview, (err, reviewCreated) => {
        if(err) res.json('error')
        else res.json(reviewCreated)
    })
})

router.post('/user-reviewed-id', function(req, res, next) {
    Review.findByIdAndUpdate(req.body.newReviewId, {userReviewed: req.body.userReviewedId}, {new: true})
        .then((reviewUpdated) => {
            res.status(200).json(reviewUpdated)
        })
        .catch(err => {
            res.status(500).json({errorMessage: 'Could not update review'})
        })
})

router.post('/get-reviews', function(req, res, next){
    Review.find({userReviewed: req.body.userReviewedId})
        .then((allReviews) => {
            res.status(200).json(allReviews)
        })
        .catch(err => {
            res.status(500).json({errorMessage: 'Could not find any reviews'})
        })
})

router.post('/reviewer', function(req, res, next) {
    User.findById(req.body.reviewerId)
        .then((reviewer) => {
            res.status(200).json(reviewer)
        })
        .catch(err => {
            res.status(500).json({errorMessage: 'Could not find the user that made the review'})
        })
})


module.exports = router;