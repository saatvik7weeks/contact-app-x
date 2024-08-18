const mongoose = require('mongoose') ; 
const dotenv = require('dotenv') ; 
dotenv.config(); 
const connectDB = require('./utils/db') ; 

connectDB() ; 
const app = require('./app') ; 


const server = app.listen(process.env.PORT , ()=>{
    console.log(`Backend running on port number : ${process.env.PORT}`)
})



