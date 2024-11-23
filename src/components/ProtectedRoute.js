import React, { useEffect } from "react";
import {jwtDecode} from "jwt-decode";
import { useNavigate } from "react-router-dom";

const Protectedroute = ({ children, requiredRole }) => {
    const navigate = useNavigate();
    const verifytoken = localStorage.getItem("adminToken") || localStorage.getItem("User");

    useEffect(() => {
        if (!verifytoken) {
            console.log("No token found. Redirecting...");
            navigate("/");
            return;
        }

        try {
            const decodetoken = jwtDecode(verifytoken);
            if (decodetoken.exp * 1000 < Date.now()) {
                console.log("Token expired. Redirecting...");
                localStorage.removeItem("adminToken");
                localStorage.removeItem("User");
                navigate("/");
                return;
            }

            if (decodetoken.role !== requiredRole) {
                console.log(`Access denied. Role '${decodetoken.role}' is not authorized.`);
                navigate("/");
                return;
            }
        } catch (error) {
            console.log("Error decoding token:", error);
            navigate("/");
        }
    }, [navigate, verifytoken, requiredRole]);

    return verifytoken ? children : null;
};

export default Protectedroute;
