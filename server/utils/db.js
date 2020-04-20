//Firestore setup
const admin = require('firebase-admin');

// let serviceAccount = require('../firestore-keys.json');
let serviceAccount = require('./firestore-keys.js');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

let db = admin.firestore();

const usersCollection = db.collection('users');
const offersCollection = db.collection('offers');
const reviewsCollection = db.collection('reviews');


module.exports = {
    admin,
    db,
    usersCollection,
    offersCollection,
    reviewsCollection
};