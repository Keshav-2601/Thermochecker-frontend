import react from "react";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import "../styling/Adminpage.css";
import React, { useState, useEffect } from "react";
import axios from 'axios';


export default function Patientpage() {
  const [inputfirstname, setfirstname] = useState("");
  const [inputage, setage] = useState("");
  const [input_tempearture, set_temperature] = useState("");
  const[inputhumidity,set_humidity]=useState("");
  const[inputpriority,set_Priority]=useState("Normal");

  const handelhumidity=(event)=>{
    console.log(event.target.value);
    set_humidity(event.target.value);
  }
  const handelInputname = (event) => {
    console.log("name is:", event.target.value);
    setfirstname(event.target.value); //this is the function so will take () even.target.value in parenthesis.
  };
 async function SubmitInfo() {
    try {
      const result=await axios.post('http://localhost:3200/admin/patient',{
        firstname:inputfirstname,
        age:inputage,
        temperature:input_tempearture,
        humidity:inputhumidity,
        priority:inputpriority
      })
      if(result.status===200){
        console.log("patients'added successfully");
      }
      // console.log("Patient's added successfully");
    } 
    catch (error) {
      console.log("Error in getting patient's data check request",error);
    }
  };

  const handelpriority=(event)=>{
    console.log(event.taget.value);
    set_Priority(event.target.value);
  }
  const handelage = (a) => {
    console.log("age is", a.target.value);
    setage(a.target.value);
  };
  const handel_temp = (tem) => {
    console.log("temp is", tem.target.value);
    set_temperature(tem.target.value);
  };
  return (
    <>
      <div className="admin-header-bar">Admin Login</div>
      <Form noValidate>
        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="validationCustom01">
            <Form.Label>First name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="First name"
              defaultValue={inputfirstname}
              onChange={handelInputname} //no need to explicitiy give para as react would automatically give para to to handelInputName.Self learning
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustom01">
            <Form.Label>Age</Form.Label>
            <Form.Control
              required
              type="number"
              defaultValue={inputage}
              placeholder="age"
              onChange={handelage}
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="validationCustom03">
            <Form.Label>Temperature</Form.Label>
            <Form.Control
              type="number"
              placeholder="temp..."
              required
              defaultValue={input_tempearture}
              onChange={handel_temp}
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="validationCustom03">
            <Form.Label>Humidity</Form.Label>
            <Form.Control
              type="number"
              placeholder="humidity..."
              required
              defaultValue={inputhumidity}
              onChange={handelhumidity}
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="validationCustom03">
            <Form.Label>Priority</Form.Label>
            <Form.Control
              type="text"
              placeholder="give priority"
              required
              defaultValue={inputpriority}
              onChange={handelpriority}
            />
          </Form.Group>
        </Row>
        <Button type="submit" onClick={SubmitInfo}>
          Submit form
        </Button>
      </Form>
    </>
  );
}
