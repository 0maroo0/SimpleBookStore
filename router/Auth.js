const express =require("express"); 
const router = express.Router();
const asyncHandlier =require("express-async-handler");
const {Auth, validate,validateSignin,validateupadrw }= require("../models/Auth");
const fileUpload = require('express-fileupload');
const jwt = require('jsonwebtoken');
const {CheckTokenAndAuthoraization,CheckTokenAndAuthoraizationAndAdmin} = require("../middlewares/checkTopken");
const bcrypt = require("bcrypt");

router.use(fileUpload());
/*
*@POST /signup users 
*@route api/Auth/signup
*@METHOD /POST
*@access Public
*/

router.post("/signup",asyncHandlier(async (req,res)=> {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const user = await Auth.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).json({ message: "This email already signed in" });
  }
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.password, salt);

  const tokenjwt = jwt.sign({email:req.body.email, name:req.body.name,age:req.body.age,isAdmin:false},"bookkeyBeo");

  const newUser = new Auth({
    email: req.body.email,
    name: req.body.name,
    age: req.body.age,
    password: hash,
    token:tokenjwt
  });

  const result = await newUser.save();
  const {password , ...other} = result._doc;
  res.status(200).json({ message: "OK" , other , tokenjwt});
}));

/*
*@POST /signin users 
*@route api/Auth/signup
*@METHOD /POST
*@access Public
*/

router.post("/signin",asyncHandlier(async (req,res)=> {
    const {error} = validateSignin(req.body); 
    if(error){
        return res.status(400).json({message:error.details[0].message});
    }
    if(!req.body.email){
      return res.status(400).json({message:"email is required"});
    }
    let user = await Auth.findOne({ email: req.body.email });
    if(!user){
        return res.status(400).json({message:"this email not exist"});
    }
   
const isMatch =await bcrypt.compare(req.body.password, user.password);
if (!isMatch) {
  return res.status(400).json({ message: "password or email not right" });
}
    const token = jwt.sign({id:user._id,email:user.email, name:user.name,age:user.age,isAdmin:user.Admin},"bookkeyBeo", {
      expiresIn: "12h",
    });

    const result =user; 
    const {password , ...other} = result._doc;
    res.status(200).json({message:"OK", ...other,refreshToken:token});
}));
/*
*@PUT /UPDATE 
*@route api/Auth/udate
*@METHOD /POST
*@access Private
*/

router.put("/update/:id",CheckTokenAndAuthoraization,asyncHandlier(async (req,res)=> {
  const {error} = validateupadrw(req.body); 
  if(error){
      return res.status(400).json({message:error.details[0].message});
  }

  const updateuser = Auth.findOneAndUpdate({_id:req.params.id},{ $set: { emailL:req.body.email,name: req.body.name, age: req.body.age }});
 
 res.status(201).json({message:"OK"})
}));
router.get("/getusers",CheckTokenAndAuthoraizationAndAdmin,asyncHandlier(async (req,res)=> {


  const user =await Auth.find();
 
 res.status(200).json({message:"OK",data:user})
}));

module.exports = router;