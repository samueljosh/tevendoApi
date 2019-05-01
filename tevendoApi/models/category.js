const mongoose = require('mongoose');

const categorySchemma = mongoose.Schema({
 _id: mongoose.Schema.Types.ObjectId,
 
 name:{type:String, require:true},
 description:{type:String, require:false},
 createdAt:{type:Date, default:Date.Now}


});

module.exports = mongoose.model('category',categorySchemma);