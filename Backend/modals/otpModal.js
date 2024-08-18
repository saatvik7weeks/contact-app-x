const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
    phoneNumber : {
        type : String , 
        required : [true , 'For verifiying it is important to have a phone number'],
        minLength : 10,
        match: /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/
    }, 
    otp : {
        type : String , 
        default : "-1"
    }, 
    timeToLive : {
        type : Date , 
        default : (Date.now() + 20 * 60 * 1000) - 1000 , 
    },
})

const Otp = new mongoose.model('Otp' , otpSchema) ; 

module.exports = Otp ; 