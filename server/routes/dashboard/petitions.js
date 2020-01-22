const express = require('express');
const router = express.Router();

const { offersCollection } = require("../../utils/db")

//find user request and pending status
router.get('/get-petitions', function(req, res) {
    offersCollection.where("userRequest", "==", req.session.user.username).get()
    .then(snap => {
        let myRequests = []
        snap.docs.forEach(doc => {
            let { id } = doc
            myRequests.push({id, ...doc.data()})
        })
        res.json(myRequests)
    })
    .catch((err) => {
        res.status(404).json({errorMessage: 'not found'})
    })
});

module.exports = router;