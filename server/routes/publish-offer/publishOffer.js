const express = require('express');
const router = express.Router();
const { singleUpload } = require("../../utils/s3")

const { offersCollection } = require("../../utils/db")


router.post('/publish-offer', singleUpload.single('offerImage'), function (req,res) {
    debugger
    //TODO asegurarme de que la duration se añade como numero
    let newOffer = {
        author:         req.session.user.id,
        authorUsername: req.session.user.username,
        authorMail:     req.session.user.email,
        title :         req.body.title,
        description :   req.body.description,
        duration :      req.body.duration,
        category :      req.body.category,
        status:         'Open',
        image:          req.file.location,
        userRequest:    ''
    }
    offersCollection.add(newOffer)
    .then((snap) => {
        return snap.get()
    })
    .then(snap => {
        let newOffer = snap.data()
        res.json(newOffer)
    })
    .catch((err) => {
        res.status(404).json({errorMessage: "offer not created"})
    })
})

module.exports = router;
