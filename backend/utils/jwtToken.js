const jwt = require('jsonwebtoken');
const sendToken = (user,statusCode,res) => {

  const token = jwt.sign(
    {
    id:user._id,
    role:user.role,
    name:user.name
   },
  process.env.JWT_SECRET,
  {expiresIn:process.env.JWT_EXPIRE});
 
  res.status(statusCode).json({
   sucess:true,
   token
  })


}

module.exports = sendToken;