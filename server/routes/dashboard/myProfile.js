const express = require('express');
const router = express.Router();

const { usersCollection, reviewsCollection } = require("../../utils/db")


router.get('/my-profile', function(req, res) {
    usersCollection.doc(req.session.user.id).get()
    .then(snap => {
        let { id } = snap
        let profileInfo = {id, ...snap.data()}
        res.json(profileInfo)
    })
    .catch((err) => {
        res.status(404).json({errorMessage: "Personal information not found"})
    })
})
  

router.get('/my-reviews', function(req, res) {
    reviewsCollection.where("userReviewed", "==", req.session.user.id).get()
    .then(snap => {
        let myReviews = []
        snap.docs.forEach(doc => {
            let { id } = doc
            myReviews.push({id, ...doc.data()})
        })
        res.json(myReviews)
    })
    .catch((err) => {
        res.status(404).json({errorMessage: "Your reviews could not be found"})
    })
})
  

module.exports = router;