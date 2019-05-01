const mongoose = require('mongoose');

const advSchemma = mongoose.Schema({
 _id: mongoose.Schema.Types.ObjectId,
 name:{type:String, required:true},
 price:{ type:Number,required:true},
 createdAt:{type:Date, default:Date.Now}


});

module.exports = mongoose.model('adv',advSchemma);