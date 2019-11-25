const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../../models/User');


//check if either username or email are already taken
router.post("/signup", (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  User.findOne({$or:[
      {username: username},
      {email: email},
      ]
    })
    .then(result => {
      if (result) {
        res.status(409).json({message: 'err'})
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          newUser = {
            firstname:        req.body.firstname,
            lastname:         req.body.lastname,
            username:         req.body.username,
            email:            req.body.email,
            birth:            req.body.birth,
            password:         hash,
            registrationDate: Date.now(),
            profileImage:     ''            
          }
          User.create(newUser, (err,userCreated) => {
            if (err) {
                res.json('error')
            }
            else {
              res.cookie("username", req.body.username);
              req.session.user = userCreated._doc
              res.json('user created');
            }
          })
        })
      }
    })
})


module.exports = router;