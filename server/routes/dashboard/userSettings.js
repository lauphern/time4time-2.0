const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt")
const { singleUpload } = require("../../utils/s3")

const User = require('../../models/User')

//You can change user's profile picture here
router.post('/profile-image', singleUpload.single('profile-image'), function(req, res, next) {
    debugger
    let editUser = {}
    editUser.profileImage = req.file.location
    debugger
    User.findOneAndUpdate({username: req.session.user.username}, editUser)
    .then((response) => {
        res.status(200).json(response)
    })
    .catch((err) => {
        res.status(500).json({message: err})
    })
});

//You can change user settings here
router.post('/user-settings', function(req, res, next) {
    if(req.body.password) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) res.status(500).json({message: err})
            else {
                let editUser = req.body
                editUser.password = hash
                User.findOneAndUpdate({username: req.session.user.username}, editUser)
                .then((response) => {
                    res.status(200).json(response)
                })
                .catch((err) => {
                    res.status(500).json({message: err})
                })
            }
        })
    } else if (!req.body.password){
        console.log('empty password')
        let editUser = {}
        req.body.email ? editUser.email = req.body.email : console.log('no email')
        req.body.bio ? editUser.bio = req.body.bio : console.log('no bio')
        User.findOneAndUpdate({username: req.session.user.username}, editUser)
        .then((response) => {
            res.status(200).json(response)
        })
        .catch((err) => {
            res.status(500).json({message: err})
        })
    } else {
        res.status(500).json({message: err})
    }
});



module.exports = router;