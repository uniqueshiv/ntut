const {
    Category
} = require('../models/category');

const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const categoryList = await Category.find();
    res.send(categoryList);
})

router.get('/:id',async(req,res)=>{
    try{
        const category = await Category.findById(req.params.id);
        res.status(200).send(category);
    }
    catch(err){
        res.status(400).json({success:false,err})
    }

})

router.put('/:id',async(req,res)=>{
    const category = await Category.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        icon: req.body.icon,
        color: req.body.color
    }, {
        new: true
    });
    if (!category) {
        return res.status(200).json({
            success: false,
            message: "category did not update"
        })
     }
     res.send(category);    
})

router.post('/', async (req, res) => {
    
    try {
        let category = new Category({
            name: req.body.name,
            icon: req.body.icon,
            color: req.body.color
        });
        category = await category.save();
        res.send(category);
    } catch (err) {
        console.log('category does not created err =' + err);
        res.status(500).send(err);
    }

})


//api/v1/categoryid
router.delete('/:id',(req,res)=>{
    Category.findByIdAndRemove(req.params.id).then(category =>{
        if(category){
            return res.status(200).json({success:true,message:"category is deleted"})
        }else{
            return res.status(404).json({success:false,message:"does not find category"})
        }
    }).catch(err=>{
        return res.status(400).json({success:false,error:err})
    })
})


module.exports = router;