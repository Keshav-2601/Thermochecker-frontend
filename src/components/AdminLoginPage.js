import React from "react";

import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap';
import { Link } from "react-router-dom";

import Adminpage from "./Adminpage.js";
import Login from "./Loginpage.js";
function AdminloginPage() {
    return (
        <>
            <figure class="text-center">
                <blockquote class="blockquote">
                    <p>ThermoChecker</p>
                </blockquote>
            </figure>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                    
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
                <Link to="/" >
                <p>
                    back to User login page
                  
                </p>
                </Link>
                 
            </Form>

        </>
    )
}
export default AdminloginPage;