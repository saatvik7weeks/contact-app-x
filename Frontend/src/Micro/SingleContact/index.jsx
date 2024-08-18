import {useState} from "react";
import { useAuth } from "../../Hooks/useAuth";
import axios from 'axios'
import FallBack from "./FallBack";
import Dialog from "../../Components/Dialog";
const SingleContact = () => {
  const { setContacts, selectedContact , setSelectedContact} = useAuth();
  const [open , setOpen] = useState(false) ; 
  if (!selectedContact) {
    return (
      <div className="flex flex-col justify-center w-[85%]">
        <h1 className="text-center text-5xl">
          Select a Contact to view Details
        </h1>
      </div>
    );
  }


  const handleDeleteContact = async () => {
    const id = selectedContact._id;
    const token = localStorage.getItem("token");
    await axios.delete(`http://127.0.0.1:3000/api/v1/contacts/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    let { data } = await axios.get("http://127.0.0.1:3000/api/v1/contacts/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setSelectedContact(undefined) ; 
    setContacts(data.data);
  };

  return (
    <>
      <div className="flex flex-col w-[85%]">
        {open && <Dialog setOpen={setOpen} curr={selectedContact} ></Dialog>}
        <div className="flex h-[80px] items-center border-b bg-gray-100/90 px-12 ">
          <div className="flex-1">
            <h1 className="text-lg font-semibold text-[18px]">
              {selectedContact.firstName} {selectedContact.lastName}
            </h1>
            <p className="text-sm text-gray-500 mt-[1rem] text-[16px]">
              {selectedContact.email}
            </p>
          </div>
          <button
            onClick={()=>setOpen(true)}
            className=" text-2xl font-bold text-white bg-blue-600 hover:bg-blue-700  m-4"
            size="icon"
            variant="outline"
          >
            Edit
          </button>
          <button
            onClick={handleDeleteContact}
            className=" text-2xl font-bold text-white bg-red-700 hover:bg-red-600  m-4"
            size="icon"
            variant="outline"
          >
            Delete
          </button>
        </div>
        <div className="flex-1 p-12 w-full mt-[1rem]">
          <div className="flex flex-col justify-around w-full">
            <div>
              <img
                alt="Jane Smith"
                className="mx-auto h-[200px] w-[200px] rounded-full object-cover"
                height={200}
                src={`https://api.dicebear.com/8.x/initials/svg?seed=${selectedContact.firstName} ${selectedContact.lastName}`}
                style={{
                  aspectRatio: "200/200",
                  objectFit: "cover",
                }}
                width={200}
              />
            </div>
            <div className="mt-[2rem] flex flex-col gap-8 w-full">
              <div>
                <h2 className="text-[20px] font-bold">
                  {selectedContact.firstName} {selectedContact.lastName}
                </h2>
                <p className="text-gray-500 text-[18px] ">Software Engineer</p>
              </div>
              <div className="flex flex-col gap-8 space-y-2">
                <div className="flex items-center gap-6">
                  <PhoneIcon className="w-10 h-10 text-gray-500 " />
                  <span className="text-[16px]">
                    {selectedContact.phoneNumber.slice(0, 3)}{" "}
                    {selectedContact.phoneNumber.slice(3)}
                  </span>
                </div>
                <div className="flex items-center gap-6">
                  <MailIcon className="w-10 h-10 text-gray-500 " />
                  <span className="text-[16px]">{selectedContact.email}</span>
                </div>
              </div>
              <div className="flex flex-col gap-8 space-y-2">
                <div className="flex items-center gap-6">
                  <LocateIcon className="w-10 h-10 text-gray-500 " />
                  <span className="text-[16px]">LPU , Jalandhar Punjab</span>
                </div>
                <div className="flex items-center gap-6">
                  <CalendarDaysIcon className="w-10 h-10 text-gray-500 " />
                  <span className="text-[16px]">
                    Date of Birth :{" "}
                    {new Date(selectedContact.dateOfBirth).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleContact;

function CalendarDaysIcon(props) {
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
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
      <path d="M8 14h.01" />
      <path d="M12 14h.01" />
      <path d="M16 14h.01" />
      <path d="M8 18h.01" />
      <path d="M12 18h.01" />
      <path d="M16 18h.01" />
    </svg>
  );
}

function LocateIcon(props) {
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
      <line x1="2" x2="5" y1="12" y2="12" />
      <line x1="19" x2="22" y1="12" y2="12" />
      <line x1="12" x2="12" y1="2" y2="5" />
      <line x1="12" x2="12" y1="19" y2="22" />
      <circle cx="12" cy="12" r="7" />
    </svg>
  );
}

function MailIcon(props) {
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
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function PhoneIcon(props) {
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
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}
