const express = require('express');
var router = express.Router();
const salesMan = require('../models/salesman')
const mongoose = require('mongoose')

router.get('/salesman',(req,res,next) =>{
    salesMan.find({}).exec().then(adv =>{
    console.log(adv);
    res.status(200).json(adv);
});
 
});

router.get('/salesman/:id',(req,res,next) =>{
 const id = req.params.id;
 salesMan.findById(id).exec().then(doc => {

    console.log(doc);
    res.status(200).json(doc);

 })
 .catch(err=>  {

     console.log(err);
     res.status(500).json({error : err});   
 });

});

router.post('/salesman',(req,res,next) =>{

    const salesMan = new salesMan({

        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        neighborhood: req.body.neighborhood,
        city : req.body.city,
        adv: req.body.advId,
        uf : req.body.city
    });
     
    salesMan.save().then(result => {

        console.log(result);
    }).catch(err => console.log(err));

    res.status(201).json({
        message:'handle gest request'
    });
});

module.exports = router;