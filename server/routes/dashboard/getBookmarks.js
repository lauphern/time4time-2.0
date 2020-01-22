const express = require('express');
const router = express.Router();

const { offersCollection } = require("../../utils/db")

router.get('/get-bookmarks', function(req, res) {
    // TODO continuar aqui (hay otro sitio tb marcado, hacer ese despues)
    // 1. Encontrar el usuario con req.session
    // 2. Coger el array yyyy iterar sobre el?
    // 3. En cada iteracion buscar la oferta correspondiente y guardar el objeto en otro array
    // Puede que necesite promises
    // Me suena que hice algo asi en algun sitio. Si no, mirar a ver si hay alguna opcion de populate en esta DB, pero creo que no
    
    // offersCollection.where("userRequest", "==", req.session.user.username).get()
    .then(snap => {
        // let myRequests = []
        // snap.docs.forEach(doc => {
        //     let { id } = doc
        //     myRequests.push({id, ...doc.data()})
        // })
        // res.json(myRequests)
    })
    .catch((err) => {
        res.status(404).json({errorMessage: 'not found'})
    })
});

module.exports = router;