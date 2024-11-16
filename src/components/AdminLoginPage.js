import React from "react";
import { Button, Form } from "react-bootstrap"; // Removed unused imports
import { Link } from "react-router-dom";
import "../styling/Adminpage.css";

function AdminloginPage() {
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
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>

        <Button className="admin-submit-button" variant="primary" type="submit">
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
