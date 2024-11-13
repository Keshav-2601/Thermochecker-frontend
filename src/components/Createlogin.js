import React from "react";
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap';
import { Link } from "react-router-dom";
function CreateLogin() {
    return (
        <>
            <Form noValidate >
                <Row className="mb-3">
                    <Form.Group as={Col} md="4" controlId="validationCustom01">
                        <Form.Label>First name</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="First name"
                            defaultValue="Mark"
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="validationCustom01">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            required
                            type="Password"
                            placeholder="password"
                        />
                        
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="validationCustomUsername">
                        <Form.Label>Email</Form.Label>
                        <InputGroup hasValidation>
                            <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                            <Form.Control
                                type="text"
                                placeholder="Email"
                                aria-describedby="inputGroupPrepend"
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Please choose a username.
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} md="6" controlId="validationCustom03">
                        <Form.Label>address</Form.Label>
                        <Form.Control type="text" placeholder="Address" required />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid city.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Button type="submit">Submit form</Button>
                <Link to='/'>
                <p>
                    Already Have account?
                </p>
                </Link>
            </Form>
        </>
    )
}
export default CreateLogin

