const express = require('express');
var router = express.Router();
const User = require("../models/user")
const mongoose = require('mongoose')

router.get('/user',(req,res,next) =>{
    User.find({}).exec().then(adv =>{
    console.log(adv);
    res.status(200).json(adv);
});
 
});

router.get('/user/:id',(req,res,next) =>{
 const id = req.params.id;
 User.findById(id).exec().then(doc => {
    console.log(doc);
    res.status(200).json(doc);
 })
 .catch(err=>  {
     console.log(err);
     res.status(500).json({error : err});   
 });

});

router.post('/user',(req,res,next) =>{
    console.log(req.file);
    const User = new User({

        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
     
    User.save().then(result => {

        console.log(result);
    }).catch(err => console.log(err));

    res.status(201).json({
        message:'handle gest request'
    });
});

module.exports = router;