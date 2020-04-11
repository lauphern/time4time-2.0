const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

const { offersCollection } = require("../../utils/db");

router.post("/send-mail", (req, res) => {
  offersCollection
    .doc(req.body.offerId)
    .get()
    .then((snap) => {
      let { id } = snap;
      let mailOffer = { id, ...snap.data() };
      let transporter = nodemailer.createTransport({
        //TODO revisar
        host: "localhost",
        port: 25,
        logger: true,
        ignoreTLS: true,
        debug: true,
      });
      transporter.sendMail({
        //TODO cambiar
        from: '"Time for time team" <tictac@time4time.org>',
        to: mailOffer.authorMail,
        subject: "You have a new request from time for time",
        text: `Somebody has sent an application for your offer, you can check this petition in our site https://www.time4time.org/. Best regards,
                Time for Time team <3 `,
      });
      //TODO revisar
      res.status(200).json(mailOffer);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;
