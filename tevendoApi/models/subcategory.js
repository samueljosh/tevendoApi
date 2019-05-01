const mongoose = require('mongoose');

const categorySchemma = mongoose.Schema({
 _id: mongoose.Schema.Types.ObjectId,
 name:{type:String, required:true},
 description:{type:String, required:false},
 category:{type: mongoose.Schema.ObjectId, ref:'category',required:true},
 createdAt:{type:Date, default:Date.Now}


});

module.exports = mongoose.model('category',categorySchemma);