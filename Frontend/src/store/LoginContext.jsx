import { useState, createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(undefined);
  const [isLogined, setIsLogined] = useState(0);
  const [contacts, setContacts] = useState([]);
  const [selectedContact , setSelectedContact] = useState(undefined) ; 
  
  useEffect(() => {
    const func = async () => {
      // console.log("it is running or not") 
      const token = localStorage.getItem("token");
      const { data } = await axios.get(
        "http://127.0.0.1:3000/api/v1/users/me",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log( "is it reaching here" ,  data);
      if (data.success) {
        setIsLogined(3);
        setUser(data.data);

        //fetch the contacts and setContacts
        const { data: contacts } = await axios.get(
          "http:/127.0.0.1:3000/api/v1/contacts/me",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
            },
          }
        );
        if (contacts.success) {
          setContacts(contacts.data);
        }
        //navigate
        navigate("/dashboard");
      } else {
        setIsLogined(0);
      }
    };
    func();
  }, [contacts  ]);

  return (
    <AuthContext.Provider
      value={{ user, setUser, isLogined, setIsLogined, contacts, setContacts,selectedContact , setSelectedContact  }}
    >
      {children}
    </AuthContext.Provider>
  );
};
