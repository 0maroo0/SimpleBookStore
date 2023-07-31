const express =require("express"); 
const router = express.Router();
const asyncHandlier =require("express-async-handler");
const {Book, validate }= require("../models/book");
const fileUpload = require('express-fileupload');
router.use(fileUpload());

/*
*@GET /viewBook  
*@route api/Auth/viewbook
*@METHOD /GET
*@access Public
*/
router.get("/viewBook", asyncHandlier( async(req,res)=>{
    const book =await  Book.find();
    res.status(200).json({message:'OK',data:book});
}));

// this route public to addbook but will be privet in production , Admin just will can add
/*
*@GET /AddBook  
*@route api/Auth/viewbook
*@METHOD /GET
*@access Public
*/
router.post("/AddBook", asyncHandlier( async(req,res)=>{
    const {error}= validate(req.body);
    if(error){
        res.status(400).json({message:error.details[0].message});
    }
    if (!req.files || !req.files.image) {
        return res.status(400).json({ message: "يرجى تحديد ملف صالح للرفع." });
      }
    
      const file = req.files.image;
      const destinationPath = 'images/' + file.name; // تحديد مسار وجهة الحفظ
    
      // نقل الملف إلى المسار المحدد
      file.mv(destinationPath, (error) => {
        if (error) {
          return res.status(500).json({ message: "حدث خطأ أثناء رفع الملف." });
        }
      });
    const book =new  Book({
        titel:req.body.titel, 
        nameWriter:req.body.nameWriter, 
        img:destinationPath,
        overview:req.body.overview, 
        aboutAuthor:req.body.aboutAuthor,
        pdfPreview:req.body.pdfPreview
    });
    const result = await book.save();
    res.json({message:'OK',data:result});
}));

module.exports= router;