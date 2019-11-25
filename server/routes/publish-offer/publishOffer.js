const express = require('express');
const router = express.Router();
const Offer = require('../../models/Offer')
const multer = require("multer")
const upload = multer({ dest: 'public/images' })
const { singleUpload } = require("../../utils/s3")

router.post('/publish-offer', singleUpload.single('offerImage'), function (req,res) {
    let addOffer = {
        author:         req.session.user._id,
        authorUsername: req.session.user.username,
        authorMail:     req.session.user.email,
        title :         req.body.title,
        description :   req.body.description,
        date :          req.body.date,
        duration :      req.body.duration,
        category :      req.body.category,
        status:         'Open',
        image:          req.file.location,
        userRequest:    ''
    }
    const newOffer = new Offer(addOffer);
    newOffer.save()
    .then((newOfferDocument) => {
        res.json(newOfferDocument)
    })
    .catch((err) => {
        res.status(404).json({errorMessage: "offer not created"})
    })

})

module.exports = router;
