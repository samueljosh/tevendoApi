const mongoose = require('mongoose');
const salesSchemma = mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String, required:true},
    phone:{type :String, required:true},
    address:{type:String, required: true},
    neighborhood:{type:String, required: true},
    adv:{type: mongoose.Schema.ObjectId, ref:'adv',required:true},
    city:{type:String, required: true},
    uf:{type:String,required:true}
});

module.exports = mongoose.model('salesman',salesSchemma);