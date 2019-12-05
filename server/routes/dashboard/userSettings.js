const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt")
const { singleUpload } = require("../../utils/s3")

const { usersCollection } = require("../../utils/db")


//You can change user's profile picture here
router.post('/profile-image', singleUpload.single('profile-image'), function(req, res) {
    usersCollection.where("username", "==", req.session.user.username).get()
    .then(snap => {
        return usersCollection.doc(snap.docs[0].id).update({
            profileImage: req.file.location
        })
    })
    .then(() => {
        res.status(200).end()
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
                //TODO revisar
                let editUser = req.body
                editUser.password = hash
                //TODO revisar
                usersCollection.doc(req.session.user.id).set(
                    editUser,
                    { merge: true }
                )                
                .then(() => {
                    res.end()
                })
                .catch((err) => {
                    res.status(500).json({message: err})
                })
            }
        })
    } else next()
});

router.post('/user-settings', function(req, res, next) {
    if (!req.body.password){
        console.log('empty password')
        let editUser = {}
        req.body.email ? editUser.email = req.body.email : console.log('no email')
        req.body.bio ? editUser.bio = req.body.bio : console.log('no bio')
        usersCollection.doc(req.session.user.id).set(
            editUser,
            { merge: true }
        )
        .then(() => {
            res.end()
        })
        .catch((err) => {
            res.status(500).json({message: err})
        })
        //TODO revisar
    } else res.end()
});


module.exports = router;