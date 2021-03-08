const { Product } = require('../models/product');
const { Category } = require('../models/category');
const mongoose = require('mongoose');

const express = require('express');
const router =  express.Router();

router.get(`/`,async(req,res) =>  {

    const productList = await Product.find().populate('category');
    if(!productList){
        res.status(500).json({success:false});
    }
    res.send(productList);
});

router.get(`/:id`,async(req,res)=>{
    try{
        // const product = await Product.find().select('name image -_id');
        const product = await Product.find().populate('category');
        res.send(product);
    }
    catch(err){
        res.status(400).json({success:false,message:"product id does not found"})
    }
})

router.delete('/:id', async(req,res)=>{
   try{
        const category = await Product.findByIdAndDelete(req.params.id);
        res.send(category);
   } catch(err){
      res.status(404).json({success:false,err})
   }

})

router.put('/:id',async (req,res)=>{

    try{
        if(!mongoose.isValidObjectId(req.params.id)){
            res.status(400).send("product id is not valid id");
        }

        const product = await Product.findByIdAndUpdate(req.params.id, {
            name:req.body.name,
            description: req.body.description,
            richDescription: req.body.richDescription,
            image: req.body.image,
            brand: req.body.brand,
            price: req.body.price,
            category: req.body.category,
            stock: req.body.stock,
            rating: req.body.rating,
            numReview: req.body.numReview,
            isFeatured: req.body.isFeatured  
        }, {        
            new: true
        });

        res.send(product);
    }
     catch(err){
        res.status(200).json({
            success: false,
            message: "product did not update",
            err
        })
        
     }
     

})

router.post(`/`,async(req,res) =>  {
    console.log("category = "+req.body.category);
  try{
    const category = await Category.findById(req.body.category);
    if(!category) return res.status(400).send("Invalid Category");

   let product = new Product({
       name:req.body.name,
       description: req.body.description,
       richDescription: req.body.richDescription,
       image: req.body.image,
       brand: req.body.brand,
       price: req.body.price,
       category: req.body.category,
       stock: req.body.stock,
       rating: req.body.rating,
       numReview: req.body.numReview,
       isFeatured: req.body.isFeatured  
   });

   product = await product.save();
   res.send(product);
   //console.log(product);
  }catch(err){
      console.log(err);
  }
    // product.save()
    // .then((createdItem) => {
    //   console.log("data has been saved");
    //   console.log(createdItem);
    //   res.status(201).json(createdItem);
    // })
    // .catch((err)=>{
    //     console.log(err);
    // })

    // if(!product){
    // return res.status(500).send('The product can not be create');
    // }
});


router.get("/get/count",async(req,res)=>{
    const productCount = await Product.countDocuments((counts)=>counts)
    if(!productCount){
        res.status(400).json({"success":false})
    }
    res.send({productCount});
});

router.get("/get/featured/:count",async(req,res)=> {
    // const products = await Product.find({isFeatured:true}).countDocuments((counts)=>counts);

    const count = req.params.count?req.params.count:0;
    const products = await Product.find({isFeatured:true}).limit(+count);

    if(!products){
        res.status(400).json({"success":false})
    }
    res.send({products});
});

module.exports = router;
