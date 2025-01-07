import react from "react";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import "../styling/Patientspage.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PubNub, { Channel } from "pubnub";

const pubnub = new PubNub({
  publishKey: process.env.REACT_APP_PUBNUB_PUBLISH_KEY,
  subscribeKey: process.env.REACT_APP_PUBNUB_SUBSCRIBE_KEY,
  ssl: process.env.REACT_APP_PUBNUB_SSL === 'true', // Convert string to boolean
  userId: process.env.REACT_APP_PUBNUB_USER_ID, // Assign a unique ID
});

export default function PatientPage() {
  const [inputFirstname, setFirstname] = useState("");
  const [inputAge, setAge] = useState("");
  const [inputTemperature, setTemperature] = useState("");
  const [inputHumidity, setHumidity] = useState("");
  const [inputPriority, setPriority] = useState("Normal");
  const [inputPreferredHumidity, setPreferredHumidity] = useState("");
  const [inputPreferredTemp, setPreferredTemp] = useState("");
  const navigate=useNavigate();

  const handlePreferredTemp = (event) => {
    setPreferredTemp(event.target.value);
  };

  const handlePreferredHumidity = (event) => {
    setPreferredHumidity(event.target.value);
  };

  
  useEffect(() => {
    const handleMessage = (event) => {
      // Extract temperature and humidity from the received message
      if (event.message && event.message.temperature && event.message.humidity) {
        setTemperature(event.message.temperature);
        setHumidity(event.message.humidity);
      } else {
        console.error("Invalid message format:", event);
      }
    };

    // Subscribe to the "thermochecker" channel
    pubnub.subscribe({ channels: ["thermochecker"] });

    // Add a listener for messages
    pubnub.addListener({
      message: handleMessage,
    });

    // Cleanup: Unsubscribe from the channel on component unmount
    return () => {
      pubnub.unsubscribe({ channels: ["thermochecker"] });
    };
  }, [pubnub]);


  const handleInputName = (event) => {
    setFirstname(event.target.value);
  };

  async function SubmitInfo(event) {
    event.preventDefault();
    try {
      const result = await axios.post(
        `${process.env.REACT_APP_API_URL}/admin/patient`,
        {
          firstname: inputFirstname,
          age: inputAge,
          temperature: inputTemperature,
          humidity: inputHumidity,
          priority: inputPriority,
          preferedHumidity: inputPreferredHumidity,
          preferedTemperature: inputPreferredTemp,
        },
      );
      if (result.status === 200) {
        navigate('/AdminHomepage');
        console.log("Patient added successfully");
      }
    } catch (error) {
      console.log("Error submitting patient data request not goinng on try block :", error);
    }
  }

  const handlePriority = (event) => {
    setPriority(event.target.value);
  };

  const handleAge = (event) => {
    setAge(event.target.value);
  };

  return (
    <>
      <div className="patients-header">Resident Details</div>
      <Form className="patients-form" noValidate>
        <Row className="mb-3">
          <Form.Group as={Col} md="12" controlId="patientFirstname">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="First name"
              defaultValue={inputFirstname}
              onChange={handleInputName}
              autoComplete="off"
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="12" controlId="patientAge">
            <Form.Label>Age</Form.Label>
            <Form.Control
              required
              type="number"
              defaultValue={inputAge}
              placeholder="Age"
              onChange={handleAge}
              autoComplete="off"
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="patientTemperature">
            <Form.Label>Temperature</Form.Label>
            <Form.Control
              type="number"
              placeholder="Temperature"
              defaultValue={inputTemperature}
              onChange={(e) => setTemperature(e.target.value)}
              autoComplete="off"
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="patientHumidity">
            <Form.Label>Humidity</Form.Label>
            <Form.Control
              type="number"
              placeholder="Humidity"
              defaultValue={inputHumidity}
              onChange={(e) => setHumidity(e.target.value)}
              autoComplete="off"
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="patientPreferredHumidity">
            <Form.Label>Preferred Humidity</Form.Label>
            <Form.Control
              type="number"
              placeholder="Preferred Humidity"
              defaultValue={inputPreferredHumidity}
              onChange={handlePreferredHumidity}
              autoComplete="off"
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="patientPreferredTemp">
            <Form.Label>Preferred Temperature</Form.Label>
            <Form.Control
              type="number"
              placeholder="Preferred Temperature"
              defaultValue={inputPreferredTemp}
              onChange={handlePreferredTemp}
              autoComplete="off"
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="patientPriority">
            <Form.Label>Priority</Form.Label>
            <Form.Control
              type="text"
              placeholder="Priority"
              defaultValue={inputPriority}
              onChange={handlePriority}
              autoComplete="off"
            />
          </Form.Group>
        </Row>
        <Button
          className="patients-submit-button"
          type="submit"
          onClick={SubmitInfo}
        >
          Submit
        </Button>
      </Form>
      <Button variant="info" onClick={()=>{navigate('/AdminHomepage')}} >Back</Button>
    </>
  );
}
