const jwt  = require('jsonwebtoken');

module.exports = (req,res,next)=>{
  try{
   
    const token =req.headers.authorization;

   
    jwt.verify(token,process.env.JWT_SECRET);
    next();
    
  }catch(error){
    res.status(401).json({
        message:'Auth Failed'
    })
  }
}