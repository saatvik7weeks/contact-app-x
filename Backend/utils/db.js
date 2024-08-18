const mongoose = require('mongoose') ; 
const dotenv = require("dotenv") ; 
dotenv.config() ; 

const connectDB = async function (){
    try{
        mongoose.set('strictQuery' , false) ; 
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Successfully connected to the Database")
    }
    catch(err){
        console.log("There was error in connecting to mongo database" , err) ; 
    }
}

module.exports = connectDB ;