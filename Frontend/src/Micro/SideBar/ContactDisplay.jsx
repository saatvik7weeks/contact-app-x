import React from 'react'
import { useAuth } from '../../Hooks/useAuth'
import { Link } from 'react-router-dom'

export default function ContactDisplay({contact}) {
  const {setSelectedContact} = useAuth()

  const handleClick =  ()=>{
    setSelectedContact(contact)
  }
  // console.log(contact) ; 
  return (
   <button onClick={handleClick} className="flex items-center gap-3 px-8 py-6 text-gray-500 transition-all rounded-lg hover:bg-gray-200 hover:text-gray-900 " href="#">
    <img src={`https://api.dicebear.com/8.x/initials/svg?seed=${contact.firstName} ${contact.lastName}`} alt="John Doe" className="w-12 h-12 rounded-full" />
      <span className='text-[18px]'>{contact.firstName} {contact.lastName}</span>
    </button>
  )
}
