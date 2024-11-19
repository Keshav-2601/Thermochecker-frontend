import react from "react";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import "../styling/Adminpage.css";
import React, { useState, useEffect } from "react";
import axios from 'axios';
import PubNub, { Channel } from "pubnub";

const pubnub = new PubNub({
  publishKey: 'pub-c-006ed63e-75db-496c-84cb-3730599207ad',
  subscribeKey: 'sub-c-3f839898-4bca-4559-93e5-44187b29f3aa',
  ssl: true,
  userId: "testUser1" // Set this to a unique ID, such as a username or UUID
});


export default function Patientpage() {
  const [inputfirstname, setfirstname] = useState("");
  const [inputage, setage] = useState("");
  const [input_tempearture, set_temperature] = useState("");
  const [inputhumidity, set_humidity] = useState("");
  const [inputpriority, set_Priority] = useState("Normal");
  const [inputpreferredhumidity, setprehumidity] = useState("");
  const [inputpreferredTemp, setpreTemp] = useState("");
  const[inputmintemp,setmintemp]=useState("");
  const[inputmaxtemp,setmaxtemp]=useState("");


const handelmintemp=(event)=>{
  console.log(event.target.value);
setmintemp(event.target.value);
}
const handelmaxtemp=(event)=>{
  console.log(event.target.value);
  setmaxtemp(event.target.value);
}
  const handelpretemp = (event) => {
    setpreTemp(event.target.value);
  }
  const handelPrehumidity = (event) => {
    setprehumidity(event.target.value);
  }
  useEffect(() => {
    pubnub.history(
      {
        channel: "pi-channel",
        count: 2,
      },
      (status, response) => {
        if (status.error) {
          console.error("Error fetching history:", status);
        } else {
          console.log("Fetched Messages:", response.messages);
        }
        response.messages.forEach((msg) => {
          console.log(msg.entry.temperature);
          set_temperature(msg.entry.temperature)
          console.log(msg.entry.humidity);
          set_humidity(msg.entry.humidity)
        })
      }

    )

  }, [])



  const handelInputname = (event) => {
    console.log("name is:", event.target.value);
    setfirstname(event.target.value); //this is the function so will take () even.target.value in parenthesis.
  };
  async function SubmitInfo(event) {
    event.preventDefault();
    try {
      const result = await axios.post('http://localhost:3000/admin/patient', {
        firstname: inputfirstname,
        age: inputage,
        temperature: input_tempearture,
        humidity: inputhumidity,
        priority: inputpriority,
        preferedHumidity: inputpreferredhumidity,
        preferedTemperature: inputpreferredTemp,
        mintemp:inputmintemp,
        maxtemp:inputmaxtemp
      }, {
        headers: {
          Authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Iktlc2hhdnY4NTdAZ21haWwuY29tIiwiaWF0IjoxNzMyMDQ5MDYzLCJleHAiOjE3MzI2NTM4NjN9.ty0bbWOtmM0j3Ihbm2wFVdxZjuGJyJ0ZFBFI-4yJU1I`,
        }
      },)
      if (result.status === 200) {
        console.log("patients'added successfully");

      }
      // console.log("Patient's added successfully");
    }
    catch (error) {
      console.log("Error in getting patient's data check request", error);
    }
  };

  const handelpriority = (event) => {
    console.log(event.target.value);
    set_Priority(event.target.value);
  }
  const handelage = (a) => {
    console.log("age is", a.target.value);
    setage(a.target.value);
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

            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="validationCustom03">
            <Form.Label>preferred_Humidity</Form.Label>
            <Form.Control
              type="number"
              placeholder="Pre_humidity..."
              required
              defaultValue={inputpreferredhumidity}
              onChange={handelPrehumidity}
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="validationCustom03">
            <Form.Label>preferredTemperature</Form.Label>
            <Form.Control
              type="number"
              placeholder="Pre_temp..."
              required
              defaultValue={inputpreferredTemp}
              onChange={handelpretemp}
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
        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="validationCustom03">
            <Form.Label>MinTemp</Form.Label>
            <Form.Control
              type="numbers"
              placeholder="Min Temp"
              required
              defaultValue={inputmintemp}
              onChange={handelmintemp}
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="validationCustom03">
            <Form.Label>Maxtemp</Form.Label>
            <Form.Control
              type="numbers"
              placeholder="Max Temp"
              required
              defaultValue={inputmaxtemp}
              onChange={handelmaxtemp}
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
