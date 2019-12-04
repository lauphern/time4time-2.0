const express = require('express');
const router = express.Router();

  
router.post('/logout', (req,res)=>{
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