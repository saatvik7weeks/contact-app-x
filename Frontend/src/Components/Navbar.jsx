import React, { useRef , useState, useContext, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import IconWiDaySunny from "../utils/dayicon";
import SearchBar from "./SearchBar";
import { useAuth } from "../Hooks/useAuth";
import Dialog from "./Dialog";

export default function Navbar() {
  const { isLogined, setIsLogined, user, setUser , setContacts , setSelectedContact } = useAuth();
  const [currtheme, setCurrTheme] = useState(0);
  const [colourChange, setColourChange] = useState(0);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/login") {
      setColourChange(1);
    }
  }, []);

  const handleColourChange = () => {
    if (window.scrollY >= 80) {
      setColourChange(1);
    } else {
      setColourChange(0);
    }
  };
  window.addEventListener("scroll", handleColourChange);

  function handleClick() {
    setCurrTheme((prev) => {
      const curr = !prev;
      return curr;
    });
  }
  let iconStyle;
  if (currtheme == 0) {
    iconStyle = {
      color: "white",
      backgroundColor: "black",
    };
  } else {
    iconStyle = {
      color: "black",
      backgroundColor: "white",
    };
  }

  function handleLoginButton(e) {
    navigate("/login");
  }

  const handleLogout = async ()=>{
    localStorage.removeItem('token') ; 
    setIsLogined(0) ; 
    setUser(undefined) ; 
    setContacts([]) ; 
    setSelectedContact(undefined) ; 
    navigate('/') ; 
  }

  const icon = currtheme === 0 ? faMoon : IconWiDaySunny;

  return (
    <>
    <div
      style={{
        backgroundColor: `${
          colourChange === 0 ? "rgba(81, 120, 237, 0)" : "white"
        }`,
      }}
      className="navbar "
    >
      <li
        className="cursor-pointer"
        onClick={() => {
          navigate("/");
          setColourChange(0);
        }}
      >
        Contact App
      </li>
      {isLogined == 0 ? (
        <div>
          <FontAwesomeIcon style={iconStyle} icon={faMoon} />
          <li onClick={handleLoginButton} className="cursor-pointer">
            Login
          </li>
        </div>
      ) : (
        <div>
          <li>  <SearchBar  ></SearchBar> </li>
          <button className="text-[16px] font-bold" onClick={()=>setOpen(true)} >Add Contacts</button>
          <FontAwesomeIcon style={iconStyle} icon={faMoon} />
          <li onClick={handleLogout} className="cursor-pointer">Log out</li>
        </div>
      )}
    </div>
    {open && <Dialog setOpen={setOpen}/>}
    </>
  );
}
