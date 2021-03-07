const {Product} = require('../models/product.js');
const express = require('express');
const router =  express.Router();

router.get(`/`,async(req,res) =>  {

    const productList = await Product.find();
    if(!productList){
        res.status(500).json({success:false});
    }
    res.send(productList);
});

router.post(`/`,(req,res) =>  {
   const product = new Product({
       name:req.body.name,
       image:req.body.image,
       stock:req.body.stock
   });
   product.save()
          .then((createdItem) => {
            console.log("data has been saved");
            console.log(createdItem);
            res.status(201).json(createdItem);
          })
          .catch((err)=>{
              console.log(err);
          })
});

module.exports = router;
