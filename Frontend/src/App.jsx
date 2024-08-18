import { useState , useEffect } from "react";
import Navbar from "./Components/Navbar";
import { Outlet, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import ContactsPage from "./Components/ContactsPage";
import FormPage from "./Components/FormPage";
import "./App.css";
import { Toaster } from "sonner";
import { AuthContextProvider } from "./store/LoginContext";
import Dashboard from "./Components/Dashboard";
import { useAuth } from "./Hooks/useAuth";

const Wrapper = ({ children }) => {
  return     <AuthContextProvider >
    {children}
  </AuthContextProvider>
};

function App() {


  return (
    <Wrapper >
  
      <div className="main-box h-[100vh] flex flex-col justify-end">
        <Navbar ></Navbar>
        <Routes>
          <Route path='/dashboard' element={<Dashboard></Dashboard>} />
          <Route path='/login' element={<FormPage></FormPage>}/>
          <Route path="/" element={<Home></Home>}>
            {" "}
          </Route>
          <Route path="/:id" element={<ContactsPage></ContactsPage>}></Route>
        </Routes>
        
        <Toaster />
      </div>
      
</Wrapper>
  );
}

export default App;
