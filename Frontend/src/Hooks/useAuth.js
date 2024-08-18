import { AuthContext } from "../store/LoginContext";
import { useContext } from "react";

export const useAuth = ()=>{
    const context = useContext(AuthContext) ; 
    if(!context){
        throw new Error('Error occured in useauth.js') ; 
    }
    return context ; 
}