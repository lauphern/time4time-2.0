var express = require('express');
var router = express.Router();
var Offer = require('../../models/Offer')
var User = require('../../models/User')

router.post('/search', function(req, res) {

    const house   = req.body.house
    const technology = req.body.technology
    const music = req.body.music
    const repair = req.body.repair
    const languages = req.body.languages
    const cooking = req.body.cooking

    Offer.find()
        .and([
            {$or: 
            [{category: house}, {category:technology}, 
            {category:music}, {category: repair},
            {category: languages}, {category: cooking}
            ]},
            {status:'Open'}
        ])
      .then((filteredOffer) => {        
          res.json(filteredOffer)})
      .catch((err) => {
          res.status(404).json({errorMessage: "Offers not found"})
      })
})

module.exports = router;