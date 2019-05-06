const express = require('express');
var router = express.Router();
const Adv = require('../models/adv')
const mongoose = require('mongoose')
const multer = require ('multer');
const upload = multer({dest:'uploads/'});

router.get('/adv',(req,res,next) =>{
Adv.find({}).exec().then(adv =>{
    console.log(adv);
    res.status(200).json(adv);
});
 
});

router.get('/adv/:id',(req,res,next) =>{
 const id = req.params.id;
 Adv.findById(id).exec().then(doc => {

    console.log(doc);
    res.status(200).json(doc);

 })
 .catch(err=>  {

     console.log(err);
     res.status(500).json({error : err});   
 });

});

router.post('/adv',upload.single("productIdImage"),(req,res,next) =>{
    console.log(req.file);
    const adv = new Adv({

        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });
     
    adv.save().then(result => {

        console.log(result);
    }).catch(err => console.log(err));

    res.status(201).json({
        message:'handle gest request'
    });
});

module.exports = router;