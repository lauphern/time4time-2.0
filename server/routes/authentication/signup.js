const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { usersCollection } = require("../../utils/db");

router.post("/signup", (req, res) => {
  const username = req.body.username;
  const email = req.body.email;

  let usernameQueryRef = usersCollection.where("username", "==", username);
  let emailQueryRef = usersCollection.where("email", "==", email);

  Promise.all([usernameQueryRef.get(), emailQueryRef.get()])
    .then(snaps => {
      if (!snaps.every(snap => snap.empty)) {
        res.json({ errorMessage: "The username or email are already taken" });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          let newUser = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            username: req.body.username,
            email: req.body.email,
            birth: req.body.birth,
            password: hash,
            registrationDate: Date.now(),
            //TODO add a default profile image
            profileImage: "",
            bookmarks: []
          };
          usersCollection
            .add(newUser)
            .then(ref => {
              return ref
                .get()
                .then(snap => {
                  res.cookie("username", req.body.username);
                  req.session.user = snap.data();
                  req.session.user.id = snap.id;
                  res.status(200).json(req.session.user);
                })
                .catch(err => res.json(err));
            })
            .catch(err => res.json(err));
        });
      }
    })
    .catch(err => res.json(err));
});

module.exports = router;
