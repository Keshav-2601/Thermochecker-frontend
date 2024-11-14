import React from "react";
import { Button, Form } from "react-bootstrap"; // Removed unused imports
import { Link } from "react-router-dom";
import "../styling/Loginpage.css";

function Login() {
  return (
    <div className="login-page-container">
      <div className="header-bar">Home Temperature Monitor</div>
      <Form className="login-form">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
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
