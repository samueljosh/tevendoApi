const express = require('express');
var router = express.Router();

const SubCategory = require('../models/subcategory')
const Category = require('../models/category')

const mongoose = require('mongoose')

// CATEGORIAS
router.get('/subcategory',(req,res,next) =>{

    subcategory.find().select('category name _id')
    .populate('category','name')
    res.status(200).json({
        message:'handle gest request'
    });
});

router.get('/subcategory/:id',(req,res,next) =>{
 SubCategory.findById(req.params.id).populate('category').exec().then(sub => {

    if(!sub){
        return res.status(404).json({
            message:"Subcategoria não encontrada!"
        });
    }
    console.log(sub);
    res.status(200).json(sub);

 })
 .catch(err=>  {

     console.log(err);
     res.status(500).json({error : err});   
 });

});

router.post('/subcategory',(req,res,next) =>{
    Category.findById(req.body.categoryId).then(category => {
        const subcategory = new SubCategory({

            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            category: req.body.categoryId,
            description: req.body.description
        });
        return category.save();
    }).then(result => console.log(result))

     
    subcategory.save().then(result => {

        console.log(result);
    }).catch(err => console.log(err));

    res.status(201).json({
        message:'handle gest request'
    });
});
