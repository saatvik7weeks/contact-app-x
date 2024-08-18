const express = require('express')
const {loginUser,signUpUser,updateUser,verifyUser, getMe} = require('../controllers/UserController')
const {protect} = require('../utils/jwt.js')

const router = express.Router() ; 


router.route('/loginuser'  ).post(loginUser) ;
router.route('/verifyuser'  ).post(verifyUser) ; 
router.route('/me').put(protect, updateUser).get(protect, getMe)

module.exports = router ; 