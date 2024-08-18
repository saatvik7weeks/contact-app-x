import {useState} from 'react'
import ContactDisplay from './ContactDisplay';
import { useAuth } from '../../Hooks/useAuth'
import { Link } from 'react-router-dom';
import Dialog from '../../Components/Dialog';

function ContactIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 18a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <circle cx="12" cy="10" r="2" />
      <line x1="8" x2="8" y1="2" y2="4" />
      <line x1="16" x2="16" y1="2" y2="4" />
    </svg>
  )
}


function PlusIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  )
}

const Sidebar = () => {
  const {contacts , setContacts} = useAuth() ; 
  const [open , setOpen ] = useState(false) ; 


  return (
    <div className='h-full text-[16px] w-[25%] border-r'>
        {open && <Dialog setOpen={setOpen} ></Dialog>}
        <div className="flex flex-col h-full max-h-screen gap-2">
          <div className="flex h-[60px] justify-between items-center border-b px-10">
            <Link className="flex items-center gap-4 font-semibold" href="#">
              <ContactIcon className="w-10 h-10" />
              <span className="text-[20px]">Contacts</span>
            </Link>
            <button onClick={()=>setOpen(true)} className="p-2 bg-white border rounded-md" size="icon" >
              <PlusIcon  className="w-8 h-8" />
              
            </button>
          </div>
          <div className="flex-1 py-2 overflow-auto">
            <nav className="grid items-start px-4 text-sm font-medium">
              {
                contacts.map((name, index) => (
                  <ContactDisplay key={index}  contact={name} ></ContactDisplay>
                ))
              }
              
            </nav>
          </div>
        </div>
    </div>
  )
}

export default Sidebar