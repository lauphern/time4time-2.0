const express = require("express");
const router = express.Router();

const { usersCollection, offersCollection } = require("../../utils/db");

router.post("/apply", function (req, res, next) {
  debugger
  //First, we retrieve the offer the user wants to apply to
  offersCollection
    .doc(req.body.offerId)
    .get()
    .then((offerSnap) => {
      debugger
      let offerId = offerSnap.id;
      res.offer = { id: offerId, ...offerSnap.data() };
      next();
    })
    .catch(() => {
      debugger
      res.json({ message: "Could not apply to the offer" });
    });
});

router.post("/apply", function (req, res, next) {
  debugger
  //Secondly, we retrieve the user and make sure they have enough time
  //on the time wallet to apply to the offer
  usersCollection
    .doc(req.session.user.id)
    .get()
    .then((userSnap) => {
      debugger
      let userId = userSnap.id;
      let user = { userId, ...userSnap.data() };
      if (user.timeWallet < res.offer.duration) {
        res.json({ message: "Not enough time in the wallet to apply" });
      } else if (user.timeWallet >= res.offer.duration) {
        next();
      }
    })
    .catch(err => {
      debugger
      res.json({ message: "Could not apply to the offer" });
    });
});

router.post("/apply", function (req, res) {
  debugger
  //Lastly, we modify the status of the offer and update the userRequest field
  //with the username of the user applying to this offer
  res.offer.userRequest = req.session.user.username;
  res.offer.status = "Pending";
  //TODO revisar que puedo hacer update en este objeto
  offerSnap
    .set(res.offer, { merge: true })
    .then(() => {
      debugger
      res.end();
    })
    .catch(() => {
      debugger
      res.json({ message: "Could not apply to the offer" });
    });
});

module.exports = router;
