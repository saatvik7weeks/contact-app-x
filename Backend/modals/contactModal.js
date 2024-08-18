const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    firstName : {
        type : String , 
        required : [true , 'First Name of a person is required']
        
    }, 
    lastName : {
        type : String , 
        required : [true , 'Last Name of a person is required']
    },
    email : {
        type : String , 
        default : "" , 
    },
    dateOfBirth : {
        type : Date , 
        
    },
    phoneNumber : {
        type : String , 
        required : [true , 'Phone Number of a person is required'] ,
        minLength : 10 ,
        
    }, 
    admin : {
        type : mongoose.Schema.ObjectId , 
        ref : 'User' , 
        required : [true , 'A user must have a parent admin']
    }

})

contactSchema.set('validateBeforeSave', false);

const Contact = new mongoose.model('Contact' , contactSchema) ;




module.exports = Contact