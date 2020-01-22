const express = require("express");
const router = express.Router();

const { usersCollection } = require("../../utils/db");

router.post("/bookmark", function(req, res, next) {
  usersCollection
    .doc(req.session.user.id)
    .get()
    .then(userSnap => {
      let user = userSnap.data();
      let bookmarks = user.bookmarks;
      bookmarks.push(req.body.offerId);
      return usersCollection.doc(req.session.user.id).update({ bookmarks });
    })
    .then(() => {
      return usersCollection.doc(req.session.user.id).get();
    })
    .then(updatedSnap => {
      let user = updatedSnap.data();
      res.status(200).json(user);
    })
    .catch(() => {
      res.status(500).json({ message: "Could not bookmark the offer" });
    });
});

router.post("/remove-bookmark", function(req, res, next) {
    usersCollection
      .doc(req.session.user.id)
      .get()
      .then(userSnap => {
        let user = userSnap.data();
        let filteredBookmarks = user.bookmarks.filter(offerId => offerId !== req.body.offerId);
        return usersCollection.doc(req.session.user.id).update({ bookmarks: filteredBookmarks });
      })
      .then(() => {
        return usersCollection.doc(req.session.user.id).get();
      })
      .then(updatedSnap => {
        let user = updatedSnap.data();
        res.status(200).json(user);
      })
      .catch(() => {
        res.status(500).json({ message: "Could not remove the bookmark" });
      });
  });

module.exports = router;
