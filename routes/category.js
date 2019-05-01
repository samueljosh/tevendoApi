const express = require('express');

var router = express.Router();

const Category = require('../models/category')

const mongoose = require('mongoose')

// CATEGORIAS
router.get('/category',(req,res,next) =>{
    Category.find({}).exec().then(category =>{
        console.log(category);
        res.status(200).json(category);
    });
     
    });

router.get('/category/:id',(req,res,next) =>{
 const id = req.params.id;
 Category.findById(id).exec().then(doc => {

    console.log(doc);
    res.status(200).json(doc);

 })
 .catch(err=>  {

     console.log(err);
     res.status(500).json({error : err});   
 });

});

router.post('/category',(req,res,next) =>{

    const category = new Category({

        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        description: req.body.description
    });
     
    category.save().then(result => {

        console.log(result);
    }).catch(err => console.log(err));

    res.status(201).json({
        message:'handle gest request'
    });
});
module.exports = router;