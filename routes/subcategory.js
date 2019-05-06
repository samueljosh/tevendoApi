const express = require('express');
var router = express.Router();
const mongoose = require('mongoose')


// const Category = require('../models/category')


const SubCategory = require('../models/subcategory')

router.post('/subcategory', (req,res, next) => {
    const subCategory = new SubCategory({
        _id: mongoose.Types.ObjectId(),
        category: req.body.categoryId,
        description: req.body.description,
        name: req.body.name
    });

    subCategory
    .save()
    .then(result => {
        console.log(result);
        res.status(201).json(result);
    }).catch(err => { 
        console.log(err);
        res.status(500).json({
                error:err
        });
    });
    res.status(201).json({
        message:"SubCategoria Criada",
        subCategory:subCategory
    });
});


// CATEGORIAS
router.get('/subcategory',(req,res,next) =>{
    SubCategory.find()
    .select('category  _id')
    .populate('category','name')
    .exec()
    .then(docs => {
        res.status(200).json({
          subcategory: docs.map(doc => {
            return {
                _id :doc._id,
                category: doc.category,
                request: {
                    type:"GET",
                    url:"http://localhost:3000/category/"+doc._id
                    }
                };

                })
              });
            })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                    error:err
            });
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

module.exports = router;