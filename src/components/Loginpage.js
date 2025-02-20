import React, { useState } from "react";
import { Button, Form } from "react-bootstrap"; // Removed unused imports
import { Link ,useNavigate} from "react-router-dom";
import "../styling/Loginpage.css";
import axios from 'axios';
import PubNub from "pubnub";




function Login() {
  const[inputEmail,setEmail]=useState("");
  const[inputPassword,setPassword]=useState("");
  const navigate = useNavigate();
  const handelEmail=(event)=>{
    console.log(event.target.value);
    setEmail(event.target.value);
  }
  const handelPassword=(event)=>{
    console.log(event.target.value);
    setPassword(event.target.value);
  }

  async function PubNub() {
    try {
      const result= await axios.get(`${process.env.REACT_APP_API_URL}/user/pubnub`);
      if(result.status===200){
        localStorage.setItem('Pubnub_user_Key',result.data.Pubnub_user_token);
      }
      else{
        console.log("pubub token not found");
      }
    } catch (error) {
      console.log("not able to send request frontend error",error)
    }
  }
  async function handelSubmit(event){
    event.preventDefault();
    try {
      const result= await axios.post(`${process.env.REACT_APP_API_URL}/user/login`,{
        email:inputEmail,
        password:inputPassword
      })
      if(result.status===200){
        console.log(result.data);
        console.log('Login successfully');
        localStorage.setItem("User",result.data.token);
      }
     
       navigate('/Homepage')
    } catch (error) {
      console.log("data not got properly check frontend request",error);
    }
    PubNub();
  }
  return (
    <div className="login-page-container">
      <div className="header-bar">Home Temperature Monitor</div>
      <Form className="login-form">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" value={inputEmail} onChange={handelEmail} autoComplete="off"/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" value={inputPassword} onChange={handelPassword} autoComplete="off"/>
        </Form.Group>
        <Button className="login-submit-button" type="submit" onClick={handelSubmit}>
          Submit
        </Button>
        <div className="login-links">
          <Link to="/create" className="login-link">
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
