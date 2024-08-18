const User = require('../modals/UserModal')
const Otp = require('../modals/otpModal')
const mongoose = require('mongoose')
const sendMessage = require('../utils/sendMsg')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config();

function createOtp() {
    let otp = Math.floor(Math.random() * (999999 - 0 + 1)) + 0;
    otp = otp.toString();
    for (let i = otp.legnth; i < 6; i++) {
        otp.push('0');
    }
    return otp;
}

const createJwt = (id) => {
    try {
        const secret = process.env.SECRET;
        const token = jwt.sign({ id }, secret, {
            expiresIn: '30d',
        });

        return token;
    } catch (error) {
        console.error('Error creating JWT:', error);
        return null; // or throw error if appropriate
    }
};


//@Desc - Send OTP
exports.loginUser = async (req, res, next) => {
    try {


        const { phoneNumber } = req.body

        if (!phoneNumber) throw new Error("Provide a Phone Number")

        let otp = await Otp.findOneAndDelete({
            phoneNumber
        })

        let otpToSend = createOtp()
        otp = await Otp.create({
            phoneNumber,
            otp: otpToSend
        })

        sendMessage(phoneNumber, otpToSend)

        res.json({
            status: 'Success',
            success: true
        })


    } catch (err) {
        console.log("Error occured while loggin in user", err.message);
        res.status(500).json({
            status: "Fail",
            message: "Enter a Valid Number",
            success: false
        })
    }
}



exports.verifyUser = async (req, res, next) => {
    try {
        const { phoneNumber, otp } = req.body
        const otpFromDB = await Otp.findOne({ phoneNumber, otp });
        console.log(phoneNumber, otp);
        if (!otpFromDB) {
            return res.status(401).json({
                status: 'Fail',
                message: `Incorrect OTP or PhoneNumber`,
                success: false
            })
        }
        // console.log(Date.now() > new Date(otpFromDB.timeToLive)) ; 
        if (Date.now() > new Date(otpFromDB.timeToLive)) {
            return res.status(401).json({
                status: 'Fail',
                message: `It's over 10 minutes now so otp is invalid or your otp is incorrect `,
                success: false
            })
        }

        //OTP IS VERIFIED
        console.log("OTP verified") ; 
        let obj = await User.findOne({ phoneNumber });
        if (!obj) {
            obj = await User.create({
                phoneNumber
            })
        }
        const token = createJwt(obj._id)

        res.json({
            status: 'Success',
            data: obj,
            token,
            success: true
        })
    }
    catch (err) {
        console.log("Error while verify the otp", err.message)
    }
}

exports.signUpUser = async (req, res, next) => {
    try {
        const user = await User.create({
            phoneNumber: req.body.phoneNumber,
            fullName: req.body.fullName,
            otp: req.body.otp,
        })

        res.json({
            status: 'Success',
            data: user
        })
    } catch (err) {
        console.log("Error occured while signup up")
    }
}

exports.updateUser = async (req, res) => {
    try {
        const { _id } = req.user
        const { fullName } = req.body

        console.log(fullName, _id)

        if (!fullName) {
            return res.status(500).json({
                success: false,
                message: "Enter Data",
                status: 'fail'
            })
        }

        let updatedUser = await User.findById(_id)

        updatedUser.fullName = fullName

        updatedUser = await updatedUser.save()

        console.log(updatedUser);
        res.json({
            success: true,
            data: updatedUser,
            status: 'Success'
        })
    } catch (err) {
        console.log('')
    }
}

exports.getMe = async (req, res) => {
    const { _id } = req.user
    try {
        const user = await User.findById(_id)
        res.json({
            success: true,
            data: user,
            status: 'Success'
        })
    }
    catch (err) {
        console.log(err)
    }

}