const express = require('express');
const router = express.Router();

const { usersCollection, offersCollection, admin: firebase } = require("../../utils/db")

router.get('/get-offers', function(req, res) {
    offersCollection.where("authorUsername", "==", req.session.user.username).get()
    .then((snap) =>{
        let offers = []
        snap.forEach(doc => {
            let { id } = doc
            offers.push({id, ...doc.data()})
        })
        res.json(offers)
    }) 
    .catch((err) =>{
        res.status(404).json({errorMessage: 'not found'})
    })
});

router.post('/approve-offer', function(req, res, next) {
    offersCollection.doc(req.body.offerId).update({
        status: 'Approved'
    })
    .then(() => {
        return offersCollection.doc(req.body.offerId).get()
    })
    .then(snap => {
        let offerApproved = snap.data()
        //TODO ver como pasar esto a la siguiente ruta para al final devolverlo al frontend
        // res.json(offerApproved)
        res.offerApproved = offerApproved
        next('route')
    })
    .catch((err) => {
        res.status(404).json({errorMessage: 'Offer could not be approved'})
    })
})


router.post('/approve-offer', function(req, res, next) {
    let { duration } = res.offerApproved
    usersCollection.doc(req.session.user.id).update({
        timeWallet: firebase.firestore.FieldValue.increment(duration)
    })
    .then(() => {
        next('route')
    })
    .catch((err) => {
        res.status(400).json({errorMessage: 'Could not find offer author and update their time wallet'})
    })
})


router.post('/approve-offer', function(req, res, next) {
    let { userRequest, duration } = res.offerApproved
    usersCollection.where("username", "==", userRequest).get()
    .then(snap => {
        return usersCollection.doc(snap.docs[0].id).update({
            timeWallet: firebase.firestore.FieldValue.increment(-duration)
        })
    })
    .then(() => {
        res.json({offerApproved: res.offerApproved})
    })
    .catch((err) => {
        res.status(400).json({errorMessage: 'Could not find offer author and update their time wallet'})
    })
})


module.exports = router;