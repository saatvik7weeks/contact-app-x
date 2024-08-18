const express = require("express");
const morgan = require("morgan");
const ContactRouter = require('./router/contactRouter')
const UserRouter = require('./router/userRouter')
const sendMessage = require('./utils/sendMsg')
const cors = require('cors') ; 

const app = express();

app.use(express.json())
app.use(cors({
    origin : true , 
    credentials : true
}))

app.use(morgan('dev'))
app.use((req , res , next)=>{
    req.requestTime = new Date().toISOString() ; 
    next() ; 
})
// sendMessage() ; 


app.get('/' , (req , res , next)=>{
    
    res.json({
        status : 'success' , 
        message : 'hello world' , 
        url : req.originalUrl , 
    })
})
app.use('/api/v1/users' , UserRouter) ; 
app.use('/api/v1/contacts' , ContactRouter) ; 

app.use('*' , (req , res , next)=>{
    console.log(req.originalUrl)
    next() ; 
})

module.exports = app