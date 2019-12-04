const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer')
const Offer = require('../../models/Offer')


router.post('/send-mail', (req,res) => {
    //step 1
    // take data from offer
    let offerId = req.body.offerId;
    Offer.findById(offerId)
        .then((mailOffer) =>{
            //step 2 set transport
            let transporter = nodemailer.createTransport({
		    host: 'localhost',
		    port: 25,
		    logger: true,
		    ignoreTLS: true,
		    debug: true
	    });
            transporter.sendMail({
                from:       '"Time for time team" <tictac@time4time.org>',
                to:         mailOffer.authorMail,
                subject:    'You have a new request from time for time',
                text:
                    `Somebody has sent an application for your offer, you can check this petition in our site https://www.time4time.org/. Best regards,
                    Time for Time team <3 `
            })
            return mailOffer;
            }).then((mailOffer) => {
                res.status(200).json(mailOffer)
            }).catch(error =>{
                res.status(500).json(error)
            });
});


module.exports = router;