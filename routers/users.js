const { User } = require('../models/user');
const express = require('express');
const router = express.Router();

router.all('/',(req,res)=>{
    res.status(201).json({success:true});
});

module.exports = router;