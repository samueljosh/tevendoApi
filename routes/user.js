const express = require('express');
var router = express.Router();
const User = require("../models/user")
const mongoose = require('mongoose')

router.get('/user', (req, res, next) => {
    User.find({}).exec().then(adv => {
        console.log(adv);
        res.status(200).json(adv);
    });

});

router.get('/user/:id', (req, res, next) => {
    const id = req.params.id;
    User.findById(id).exec().then(doc => {
        console.log(doc);
        res.status(200).json(doc);
    })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });

});


router.post('/user/login', (req, res, next) => {

    const email = req.params.email;
    const password = req.params.password;


    User.findOne({email}).then(user => {
        if (!user || !user.validatePassword(password)) {
            res.status(500).json(user);
        }
        else {
            res.status(200).json(user);
        }
    }).catch(err => {
        console.log(err);
         res.status(500).json({ error: err });
        });

});

router.post('/user/register', (req, res, next) => {
    let errors = []
    const user = new User({

        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    if (user.password.length < 5) {
        errors.push({ msg: "A senha precisa conter mais do que cinco caracteres" });
        res.status(500).json({ error: errors });

    }
    else {
        user.save().then(result => {
            res.status(200).json(result);

            console.log(result);
        }).catch(err => {
            console.log(err)
 
            res.status(500).json({ error: err });
        }

        );
    }

});

module.exports = router;