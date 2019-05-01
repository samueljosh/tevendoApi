const express = require('express');
const app = express();
const morgan = require('morgan');

const bodyParser = require('body-parser')
const mongoose = require('mongoose')

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use((req,res,next) =>{

    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','Origin, X-Requested-With ,Content-Type, Accept, Authorization');
if(req.method === 'OPTIONS'){
    Response.header('Access-Control-Allow-Methods','PUT,POST,PATCH,DELETE,GET')
    return res.status(200).json({});
}
next();
})
const advRoutes = require('./routes/adv');
const categoryRoutes = require('./routes/category');
// const subCategoryRoutes = require('./routes/subcategory')
mongoose.connect('mongodb://localhost/test');

app.use('/api',advRoutes);
app.use('/api',categoryRoutes);
// app.use('/api',subCategoryRoutes);


app.use((req,res,next) => {

    const error = new Error('Not found');
    error.status(404)
    next(error);
})

app.use((error,req,res,next) => {
    res.status(error.status || 500);
    res.json({
        error:{
            message: error.message
        }
    })
})

module.exports = app;