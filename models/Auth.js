const mongoose = require("mongoose");
const Joi = require('joi');

const authSchame = new mongoose.Schema({
    name:{
        type:String,
        required:true, 
        trim:true, 
        minlength:3,
        maxlength:100,
    },
    email:{
        type:String,
        required:true, 
        trim:true, 
        minlength:3,
        maxlength:100,
    },
    token:{
        type:String,
        default:'',
    },
    Admin:{
        type:Boolean,
        default:false,
        required:true, 
        trim:true, 
        minlength:3,
        maxlength:100,
    },
    age:{
        type:Number,
        required:true, 
        trim:true, 
    },
    img:{
        type:String,
        default:"beopic.png",
        trim:true, 
    },
    password:{
        type:String,
        trim:true, 
        required:true,
    },
},{
    timestamps:true
}); 
function validate(obj){ 
    const schame = Joi.object({
     email: Joi.string().min(3).max(100).email().required(),
     name: Joi.string().min(3).max(100).required(),
     age: Joi.string().required(),
     password: Joi.string().min(3).max(100).required(), 
     img: Joi.string()
    })
    return schame.validate(obj);
 }
 function validateSignin(obj){ 
    const schame = Joi.object({
     email: Joi.string().min(3).max(100).email().required(),
     password: Joi.string().min(3).max(100).required(), 
    })
    return schame.validate(obj);
 }
 function validateupadrw(obj){ 
    const schame = Joi.object({
     email: Joi.string().min(3).max(100).email(),
     name: Joi.string().min(3).max(100),
     age: Joi.string(),
     img: Joi.string()
    })
    return schame.validate(obj);
 }
 const Auth =mongoose.model("users", authSchame); 

 module.exports={
    Auth, 
    validate,
    validateSignin,
    validateupadrw
 }