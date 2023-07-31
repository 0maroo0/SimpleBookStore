const mongoose = require("mongoose");
const Joi = require('joi');

const CategoriesSchame = new mongoose.Schema({
    titel:{
        type:String,
        required:true, 
        trim:true, 
        minlength:3,
        maxlength:100,
    },
},{
    timestamps:true
}); 
 const Categories =mongoose.model("categories", CategoriesSchame); 

 module.exports={
    Categories, 
 }