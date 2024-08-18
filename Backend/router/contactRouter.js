const express = require('express');
const {getAllContacts , getContacts , createContact , deleteContact , updateContact} = require('../controllers/contactController')
const {protect} = require('../utils/jwt.js')

const router = express.Router() ; 



router.route('/').get(getAllContacts)
                 .post(protect, createContact)

                 
router.route('/me').get(protect , getContacts)


router.route('/:id').patch(protect, updateContact)
                    .delete(protect, deleteContact)

                    
module.exports = router ; 