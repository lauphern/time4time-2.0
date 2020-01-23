const express = require('express');
const router = express.Router();

const { usersCollection, offersCollection } = require("../../utils/db")

router.get('/get-bookmarks', function(req, res) {
    usersCollection.doc(req.session.user.id).get()
    .then(snap => {
        if(!snap.exists) res.status(500).json({errorMessage: 'Could not find the bookmarks'});
        else {
            let bookmarkIds = snap.data().bookmarks
            let queries = bookmarkIds.map(id => {
                return offersCollection.doc(id).get()
            })
            return Promise.all(queries)
        }
    })
    .then(snap => {
        let bookmarkDocuments = []
        snap.forEach(doc => {
            let { id } = doc
            bookmarkDocuments.push({id, ...doc.data()})
        })
        res.status(200).json(bookmarkDocuments)
    })
    .catch((err) => {
        res.status(404).json({errorMessage: 'not found'})
    })
});

module.exports = router;