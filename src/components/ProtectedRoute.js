import React from "react";
import {jwtDecode} from "jwt-decode";
import { useNavigate } from 'react-router-dom';
const Protectedroute = function ({ children, requiredRole }) {
    const navigate = useNavigate();
    const verifytoken = localStorage.getItem("adminToken") || localStorage.getItem("User");
    if (!verifytoken) { 
        navigate('/');
        return null;
    }
    //check for expiring tokens
    //decode the token i get from local.
    try {
        const decodetoken = jwtDecode(verifytoken);
        if (decodetoken.exp * 1000 < Date.now()) {
            console.log("Token expired. Redirecting to login...");
            navigate('/');
            return null;
         }
        //now see Admin and User 
        // if(decodetoken.role==="Admin"){
        //     navigate('/adminHomepage');
        // }
        // else if(decodetoken.role==="User"){
        //     navigate("/Homepage");
        // }//no use since we not passing role and children.
        if(decodetoken.role!=requiredRole){
            navigate('/');
        }
        return children;
    } 
    catch (error) {
        console.log("No token available ",error);
        navigate('/');
    }
    return null;
}
export  default Protectedroute;