const express = require('express');
const router = express.Router();


const { usersCollection, reviewsCollection } = require("../../utils/db")

router.get('/author-profile/:id', function(req, res) {
    let {id} = req.params;
    usersCollection.doc(id).get()
    .then((snap)=>{
        //TODO hacer esta validacion en todas las busquedas!
        if(!snap.exists) res.status(500).json({errorMessage: 'author data not found'});
        else {
            let authorProfile = snap.data()
            authorProfile.id = snap.id;
            res.status(200).json(authorProfile)
        }
    })
    .catch((err)=>{
        res.status(500).json({errorMessage: 'author data not found'});
    });
});

router.post('/new-review', function(req, res) {
    //TODO check that it works
    let newReview = {
        rating: req.body.rate1,
        opinion: req.body.opinion,
        date: req.body.date,
        reviewer: req.session.user.id,
        //TODO
        userReviewed: req.body.userReviewedId
    }
    //TODO test
    reviewsCollection.add(newReview)
    .then(snap => {
        //TODO revisar esto
        let reviewCreated = snap.data()
        res.json(reviewCreated)
    })
    .catch(err => res.json(err))
})

// router.post('/user-reviewed-id', function(req, res) {
//     //TODO revisar cuando se hacia esta request, porque parece parte de otra
//     //tiene que ir dentro de lo de /new-review
//     reviewsCollection.doc(req.body.newReviewId).update({
//         userReviewed: req.body.userReviewedId
//     })
//     .then(() => {
//         return reviewsCollection.doc(req.body.newReviewId).get()
//     })
//     .then(snap => {
//         let reviewUpdated = snap.data()
//         res.status(200).json(reviewUpdated)
//     })
//     .catch(err => {
//         res.status(500).json({errorMessage: 'Could not update review'})
//     })
// })

router.post('/get-reviews', function(req, res){
    //TODO revisar
    reviewsCollection.where("userReviewed", "==", req.body.userReviewedId).get()
    .then((snap) => {
        let allReviews = []
        snap.forEach(doc => allReviews.push(doc.data()))
        res.status(200).json(allReviews)
    })
    .catch(err => {
        res.status(500).json({errorMessage: 'Could not find any reviews'})
    })
})

//TODO tal vez lo puedo convertir en una route reusable para conseguir un username siempre, y en el front end convertirlo en una function qeu la pongo en utils, como lo de auth. Y aqui, pues tal vez en utils, no se
router.post('/reviewer', function(req, res) {
    //TODO revisar
    usersCollection.doc(req.body.reviewerId).get()
    .then((snap) => {
        let reviewer = snap.data()
        res.status(200).json(reviewer)
    })
    .catch(err => {
        res.status(500).json({errorMessage: 'Could not find the user that made the review'})
    })
})


module.exports = router;