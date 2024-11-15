import react from 'react';
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
 export default function Adminpage() {
    const[inputfirstname,setfirstname]=useState('');
    const[inputage,setage]=useState('');
    const[input_tempearture,set_temperature]=useState('');

    const handelInputname=(event)=>{
        console.log("name is:",event.target.value);
        setfirstname(event.target.value);//this is the function so will take () even.target.value in parenthesis.
    }
    const SubmitInfo=()=>{
        //here axios code.
    }
    const handelage=(a)=>{
        console.log("age is",a.target.value)
        setage(a.target.vale);
    }
    const handel_temp=(tem)=>{
        console.log("temp is",tem.target.value);
        set_temperature(tem.target.value);
    }
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
                            defaultValue={inputfirstname}
                             onChange={handelInputname}//no need to explicitiy give para as react would automatically give para to to handelInputName.Self learning
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="validationCustom01">
                        <Form.Label>Age</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            defaultValue={inputage}
                            placeholder="age"
                            onChange={handelage}
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
                        <Form.Label>Temperature</Form.Label>
                        <Form.Control type="text" placeholder="temp..." required
                        defaultValue={input_tempearture}
                        onChange={handel_temp}
                        />
                    </Form.Group>
                </Row>
                <Button type="submit" onClick={SubmitInfo()}>Submit form</Button>
            </Form>
        </>
    )
}
