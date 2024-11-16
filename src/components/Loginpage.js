import React, { useState } from "react";
import { Button, Form } from "react-bootstrap"; // Removed unused imports
import { Link } from "react-router-dom";
import "../styling/Loginpage.css";
import axios from 'axios';
function Login() {
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

  async function handelSubmit(){
    try {
      const result= await axios.post('localhost:3000',{
        email:inputEmail,
        password:inputPassword
      })
      console.log('Login successfully');
    } catch (error) {
      console.log("data not got properly check frontend request",error);
    }
  }
  return (
    <div className="login-page-container">
      <div className="header-bar">Home Temperature Monitor</div>
      <Form className="login-form">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" value={inputEmail} onChange={handelEmail} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" value={inputPassword} onChange={handelPassword} />
        </Form.Group>
        <Button className="login-submit-button" type="submit">
          Submit
        </Button>
        <div className="login-links">
          <Link to="/createLogin" className="login-link">
            Don't have an account?
          </Link>
          <Link to="/adminlogin" className="login-link">
            Admin Login
          </Link>
        </div>
      </Form>
    </div>
  );
}

export default Login;
