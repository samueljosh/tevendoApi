const mongoose = require('mongoose');

const userSchemma = mongoose.Schema({
     _id: mongoose.Schema.Types.ObjectId,
     name:{type:String, required:true},
     email:{type:String, required:false},
     password:{type:String, required:true},
     createdAt:{type:Date, default:Date.Now}
});

module.exports = mongoose.model('user',userSchemma);