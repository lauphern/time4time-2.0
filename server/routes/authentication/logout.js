var express = require('express');
var router = express.Router();

  
router.post('/logout', (req,res, next)=>{
    req.session.destroy((err) => {
        if(err){
        console.log('error logout')
        } else {
        res.clearCookie('username');
        res.status(200).json({message: 'log out success'})
        }
    });
});


module.exports = router;