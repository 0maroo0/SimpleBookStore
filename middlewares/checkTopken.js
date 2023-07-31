const jwt = require('jsonwebtoken');

function checkToken(req,res,next){
    try{
        const  token = req.headers.authorization;
        if(token){
            try{  
                const decode = jwt.verify(token,"bookkeyBeo");
             req.user = decode;
             next();
            }
            catch(e){res.status(400).json({message:"invalid Token"});}

        }else{
            res.status(401).json({message:"No token provide"});
        }

    }
    catch(e){res.status(400).json({message:e});}
}
function CheckTokenAndAuthoraization(req,res,next){
    checkToken(req,res, ()=>{
        if( req.user.id!== req.params.id){
            return res.status(403).json({message:"you are not allow to edit"});
        
          }else{
            next();
          }
    });
}
function CheckTokenAndAuthoraizationAndAdmin(req,res,next){
    checkToken(req,res, ()=>{
        if(!req.user.isAdmin){
            return res.status(403).json({message:"you are not Admin"});
        
          }else{
            next();
          }
    });
}

module.exports = {
    checkToken,
    CheckTokenAndAuthoraization,
    CheckTokenAndAuthoraizationAndAdmin
}