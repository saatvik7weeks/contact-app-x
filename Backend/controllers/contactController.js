const mongoose = require('mongoose')
const Contact = require('../modals/contactModal')

exports.getAllContacts = async (req , res , next)=>{
    try{
        const users = await Contact.find() ; 
        res.status(200).json({
            status : 'Success' , 
            length : users.length , 
            data : users
        })
    }catch(err){
        console.log("Error occured in getting entire contact list")
    }
    
}

exports.getContacts = async( req , res , next)=>{
//    console.log("It is reaching here") ; 
    const {_id} = req.user
    try {
        const users = await Contact.find({admin : _id}) ; 
        res.status(200).json({
            status : 'Success' , 
            data : users 
        })
    }catch(err){
        
        console.log("Error in gettling all contact list" , err.message)
    }

}

exports.createContact = async (req , res , next)=>{
    const {_id} = req.user
    try{
        const user = await Contact.create({
            firstName : req.body.firstName , 
            lastName : req.body.LastName , 
            email : req.body.email , 
            dateOfBirth : req.body.DateOfBirth , 
            phoneNumber : req.body.phoneNumber , 
            admin :  _id
        })
        res.status(200).json({
            status : 'Success' ,
            data : user 
        })
    }
    catch(err){
        console.log("Error occured while creating a new Contact" , err.message) ; 
    }
}

exports.updateContact = async(req , res , next)=>{
    try {
        const data = req.body ; 
        const id = req.params

        const user = await Contact.findById(new mongoose.Types.ObjectId(id))
        user.firstName = data.firstName ; 
        user.lastName = data.LastName ;
        user.email = data.email ;
        user.phoneNumber = data.phoneNumber ;
        user.DateOfBirth = data.dateOfBirth ; 

        await user.save() ;

        res.status(200).json({
            status : 'Success' , 
            data : user
        })
    }
    catch(err){
        console.log("Error occured while updating the details of the contact" , err.message) ; 
    }
}

exports.deleteContact = async(req , res , next)=>{
    try{
        await Contact.deleteOne({_id : req.params.id}) ; 
        res.status(200).json({
            status : 'Success' , 
            message : 'Contact deleted successfully'
        })
    }
    catch(err){
        console.log("Error occured while deleting a docuement") ; 
    }
}