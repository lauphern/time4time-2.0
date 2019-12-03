const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const { usersCollection } = require("../../utils/db")

router.post("/login", (req, res)=> {
  usersCollection
  .where("username", "==", req.body.username)
  .get()
  .then(snap => {
    let user = snap.docs[0].data()
    if(bcrypt.compareSync(req.body.password, user.password)) {
      req.session.user = user
      req.session.user.id = snap.docs[0].id
      res.cookie("username", req.body.username);
      res.status(200).json(user)
    }
    //TODO pickup in frontend y revisar todo frontend
    else res.status(403).json({username: "Invalid credentials"})
  })
  .catch((error)=> {
    res.status(500).json(error)
  })
})


module.exports = router;