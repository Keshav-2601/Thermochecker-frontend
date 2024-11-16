import React, { useState,useEffect } from "react";
import { Button, Form } from "react-bootstrap"; // Removed unused imports
import { Link } from "react-router-dom";
import "../styling/Adminpage.css";
import axios from 'axios';
function AdminloginPage() {
    const[inputEmail,setEmail]=useState("");
    const[inputPassword,setPassword]=useState("");
    const handelEmail=(event)=>{
        console.log(event.target.value);
        setEmail(event.target.value);
    }
    const handelPassword=(event)=>{
        console.log(event.target.value);
        setPassword(event.target.value);
    }
   async function handelsubmit(){
        try {
            const Result=await axios.post('loalhost:3200/AdminLoginPage',{
                email:inputEmail,
                password:inputPassword
            })
            console.log("Admin Login successfully");
            
        } catch (error) {
            console.log("pls check the request inputs ",error);
        }
    }

  return (
    <div className="admin-login-container">
      {/* Page Header */}
      <div className="admin-header-bar">Admin Login</div>

      {/* ThermoChecker Title */}
      <figure className="text-center">
        <blockquote className="blockquote">
          <p>ThermoChecker</p>
        </blockquote>
      </figure>

      {/* Login Form */}
      <Form className="admin-login-form">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" value={inputEmail} onChange={handelEmail} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" value={inputPassword} onChange={handelPassword} />
        </Form.Group>

        <Button onSubmit={handelsubmit()} className="admin-submit-button" variant="primary" type="submit">
          Submit
        </Button>

        {/* Link to User Login */}
        <div className="admin-back-link">
          <Link to="/" className="back-to-user-login">
            Back to User Login Page
          </Link>
        </div>
      </Form>
    </div>
  );
}

export default AdminloginPage;
