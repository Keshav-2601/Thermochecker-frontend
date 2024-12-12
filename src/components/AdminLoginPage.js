import React, { useState,useEffect } from "react";
import { Button, Form } from "react-bootstrap"; // Removed unused imports
import { Link, useNavigate } from "react-router-dom";
import "../styling/Adminpage.css";
import axios from 'axios';
function AdminloginPage() {
    const[inputEmail,setEmail]=useState("");
    const[inputPassword,setPassword]=useState("");
    const Navigate=useNavigate();
    const handelEmail=(event)=>{
        console.log(event.target.value);
        setEmail(event.target.value);
    }
    const handelPassword=(event)=>{
        console.log(event.target.value);
        setPassword(event.target.value);
    }
   async function handelsubmit(event){
        event.preventDefault();
        try {
            const Result=await axios.post(`${process.env.REACT_APP_API_URL}/admin/adminlogin`,{
                email:inputEmail,
                password:inputPassword
            })
            console.log("Status is: ",Result.status);
            if (Result.status === 200) {
              console.log("Admin Login successful");
              localStorage.setItem('adminToken', Result.data.token);
              if (Result.data.token) {
                localStorage.setItem('adminToken', Result.data.token);
                console.log("Token stored in localStorage");
            } else {
                console.error("Token not found in response data");
            }
              Navigate('/AdminHomepage');
          }
        } catch (error) {
            console.log("pls check the request inputs ",error);
        }

        async function pubnub() {
          try {
            const result=await axios.get(`${process.env.REACT_APP_API_URL}/admin/pubnub`);
            if(result.status===200){
              localStorage.setItem('Pubnubtoken',result.data.Pubnub_Token);
              console.log("Pubnub token is Local Storage successfully!!");
            }
            else{
              console.log("pubnub Token not found");
            }
          } catch (error) {
            console.log("Request not send to backend for Pubnub Token some error",error);
          }
        }
        pubnub();
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
          <Form.Control type="email" placeholder="Enter email" value={inputEmail} onChange={handelEmail} autoComplete="off" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" value={inputPassword} onChange={handelPassword} autoComplete="off" />
        </Form.Group>

        <Button onClick={handelsubmit} className="admin-submit-button" variant="primary" type="submit">
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
