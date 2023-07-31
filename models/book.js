const mongoose = require("mongoose");
const Joi = require('joi');

const BookSchame = new mongoose.Schema({
    titel:{
        type:String,
        required:true, 
        trim:true, 
        minlength:3,
        maxlength:100,
    },
    nameWriter:{
        type:String,
        required:true, 
        trim:true, 
        minlength:3,
        maxlength:100,
    },
    rate:{
        type:Number,
        default:0,
        trim:true, 
    },
    img:{
        type:String,
        required:true, 
        trim:true, 
    },
    pdfPreview:{
        type:String,
        trim:true, 
    },
    overview:{
        type:String,
        required:true, 
        trim:true, 
    },
    aboutAuthor:{
        type:String,
        required:true,
    },
},{
    timestamps:true
}); 
function validate(obj){ 
    const schame = Joi.object({
     titel: Joi.string().min(3).max(100).required(),
     nameWriter: Joi.string().min(3).max(100).required(),
     rate: Joi.number(),
     pdfPreview: Joi.string(), 
     img: Joi.string(),
     overview: Joi.string(), 
     aboutAuthor: Joi.string()
    })
    return schame.validate(obj);
 }
 
 const Book =mongoose.model("books", BookSchame); 

 module.exports={
    Book, 
    validate,
 }