const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const User = require('../modals/UserModal.js')

dotenv.config()

const secret = process.env.SECRET

const verifyToken = (token) => {
  return jwt.verify(token, secret)
}

exports.protect = async (req, res, next) => {
  //Bearer jdbhfkjhdgfhdsbfhjsdghgbhdfjbghdfsbg
  const token = req?.headers?.authorization?.split(' ')[1]
  console.log(token)
  if (!token) return res.status(401).json({
    status: 'fail',
    message: 'Access Denied',
    success: false
  })
  
  try {
    const isVerified = verifyToken(token)
    if (!isVerified) {
      return res.status(401).json({
        status: 'fail',
        message: 'Access Denied',
        success: false
      })
    }
    
    /**
     * {
     *    id: 'userid'
     * }
    */
   
   const user = await User.findById(isVerified.id)
   
   if (!user) {
     return res.status(401).json({
       status: 'fail',
       message: 'User not Available',
       success: false
      })
    }
    
    req.user = user
    // console.log(req.user) ; 
    next()

  }
  catch (errr) {
    return res.status(401).json({
      status: 'fail',
      message: 'Something Went Wrong!',
      success: false
    })
  }
}

