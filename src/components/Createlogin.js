import React, { useState ,useEffect} from "react";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import { Link,useNavigate } from "react-router-dom";
import "../styling/CreateLogin.css";
import axios from 'axios';

function CreateLogin() {
  let[inputFirstname,setFirstname]=useState("");
  let[inputPassword,setPassword]=useState("");
  let[inputEmail,setEmail]=useState("");
  let[inputAddress,setAddress]=useState("");
  const navigate=useNavigate();
  const handelname=(event)=>{
    console.log(event.target.value);
    setFirstname(event.target.value);
  }
  const handelEmail=(event)=>{
    console.log(event.target.value);
    setEmail(event.target.value);
  }
  const handelPassword=(event)=>{
    console.log(event.target.value);
    setPassword(event.target.value);
  }
  const handelAddress=(event)=>{
    console.log(event.target.value);
    setAddress(event.target.value);
  }
  async function handelSubmit(event){
    event.preventDefault();
    try {
      const data = await axios.post('http://localhost:3200/user/create', {
        firstname:inputFirstname,
        password:inputPassword,
        email:inputEmail,
        address:inputAddress
        
      })
      console.log("Data submited");
      navigate('/');
    } catch (error) {
      console.log("cannot send the data!!",error);
    }
    
    

  }
  return (
    <div className="create-login-page-container">
      <div className="header-bar">Create Your Account</div>
      <Form className="create-login-form" noValidate>
        <Row className="mb-3">
          <Form.Group as={Col} md="12" controlId="validationCustom01">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="First name"
              defaultValue={inputFirstname}
              className="create-login-input"
              onChange={handelname}
              autoComplete="off"
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="12" controlId="validationCustom02">
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              type="password"
              placeholder="Password"
              className="create-login-input"
              onChange={handelPassword}
              value={inputPassword}
              autoComplete="off"
            />
          </Form.Group>
          <Form.Group as={Col} md="12" controlId="validationCustom03">
            <Form.Label>Email</Form.Label>
            <InputGroup hasValidation>
              <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
              <Form.Control
                type="email"
                placeholder="Email"
                aria-describedby="inputGroupPrepend"
                required
                className="create-login-input"
                onChange={handelEmail}
                value={inputEmail}
                autoComplete="off"
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid email.
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="12" controlId="validationCustom04">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Address"
              required
              className="create-login-input"
              onChange={handelAddress}
              value={inputAddress}
              autoComplete="off"
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid address.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Button type="submit" className="create-login-button" onClick={handelSubmit}>
          Submit Form
        </Button>
        <Link to="/" className="create-login-link">
          Already have an account?
        </Link>
      </Form>
    </div>
  );
}
export default CreateLogin;
