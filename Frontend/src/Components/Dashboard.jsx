import {useContext , useEffect, useState} from 'react'
import { useAuth } from '../Hooks/useAuth';
import axios from 'axios'
import SideBar from '../Micro/SideBar'
import SingleContact from '../Micro/SingleContact'

export default function Dashboard() {
  
  const {contacts , setContacts , user , setUser , isLogined , setIslogined , selectedContact , setSelectedContact } = useAuth() ; 

  useEffect(()=>{
    async function getContacts(){
      try{
        console.log("dashboard effect called");
        let token = localStorage.getItem('token') ; 

        let {data} = await axios.get('http://127.0.0.1:3000/api/v1/contacts/me' , {
          headers : {
            Authorization : `Bearer ${token}`
          }
        })
        // console.log(data.data) ; 
        setContacts(data.data) ; 
      }
      catch(err){
        console.log("Error in gettting contacts of the user" , err) ; 
      }
    }
    getContacts() ; 
  }, []) ; 

  return (
    <div className='w-full flex h-[90.5vh] '>
        <SideBar />
        <SingleContact/>
    </div>

  )
}
