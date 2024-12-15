import React, { useEffect, useState } from "react";
import PubNub from 'pubnub';
import { Link, Navigate, useNavigate } from "react-router-dom";
import Adminpage from "./Patientspage.js";
import axios from 'axios';
import { Alert, Modal, ModalBody, Button } from "react-bootstrap";
import '../styling/AdminModal.css';

// TLS communication for PubNub clients is enabled by default. 
// If you need to disable it for any reason, it can be done during the PubNub object initialization.
//  Each SDK has its own API, so refer to our SDK docs for the one that you are using.

async function sendmessage(temp) {

  const pubtoken = sessionStorage.getItem("Pubnubtoken");
  if (!pubtoken) {
    console.error("Pubnubtoken not found in localStorage!");
    return;
  }

  console.log("pubtoken admin: ",pubtoken);
  const pubnub = new PubNub({
    publishKey: process.env.REACT_APP_PUBNUB_PUBLISH_KEY,
    subscribeKey: process.env.REACT_APP_PUBNUB_SUBSCRIBE_KEY,
    secretKey:process.env.REACT_APP_SECRET_KEY,
    ssl: process.env.REACT_APP_PUBNUB_SSL === "true",
    userId: process.env.REACT_APP_PUBNUB_USER_ID, 
    authKey: pubtoken,
  });

  const message = {
    temperature: temp,
    text: "Turn on the heater",
  };

  try {
    const response = await pubnub.publish({
      channel: "pi_channel", 
      message: message,
    });
    console.log("Successfully published message!!", response);
  } catch (error) {
    console.error("Some error, not able to publish:", error);
  }
}






function AdminHomepage() {

  const [PatientData, setPatientData] = useState([]);
  const [expandedDetails, setExpandedDetails] = useState(null);
  const [minTemperature, setMinTemperature] = useState({});
  const [maxTemperature, setMaxTemperature] = useState({});
  const [toggles, setToggles] = useState({});
  const [selectedpatient, setslectedpatient] = useState(null);
  const [modalstate, setmodalstate] = useState(false);


  const navigate = useNavigate();
  function adddatapage() {
    navigate('/admin');
  }
  function openmodal(patient) {
    setslectedpatient(patient);
    setmodalstate(true);
  }
  function closemodal() {
    setslectedpatient(null);
    setmodalstate(false);
  }
  useEffect(() => {
    async function fetchData() {
      try {
        const result = await axios.get(`${process.env.REACT_APP_API_URL}/Homepage/`);
        setPatientData(result.data.data);
      } catch (error) {
        console.log("Not able to receive data successfully", error);
      }
    }
    fetchData();
  }, []);


  const toggleDetails = (id) => {
    setExpandedDetails(expandedDetails === id ? null : id);
  };

  const handleToggle = (id) => {
    setToggles({
      ...toggles,
      [id]: { notifications: !toggles[id]?.notifications },
    });
  };

  const updateTemperature = (id, type, operation) => {
    const updateState = type === "min" ? minTemperature : maxTemperature;
    const setState = type === "min" ? setMinTemperature : setMaxTemperature;

    setState({
      ...updateState,
      [id]: Math.max(
        0,
        Math.min(
          50, // Keep temperature in a valid range
          updateState[id] + (operation === "increase" ? 1 : -1)
        )
      ),
    });
  };

  const handel_modal_firstname = (event) => {
    setslectedpatient((pre_state) => ({
      ...pre_state,
      firstname: event.target.value,
    }));
  }

  const handel_modal_age = (event) => {
    setslectedpatient((pre_state) => ({
      ...pre_state,
      age: event.target.value,
    }));
  }

  const handel_modal_prehum = (event) => {
    setslectedpatient((pre_state) => ({
      ...pre_state,
      preferedHumidity: event.target.value,
    }));
  }
  const handel_modal_preTemp = (event) => {
    setslectedpatient((pre_state) => ({
      ...pre_state,
      preferedTemperature: event.target.value,
    }));
  }
  async function handel_modal_click(id) {
    try {
      const token = localStorage.getItem("adminToken");
      console.log("token is ", token);
      const Result = await axios.put(`${process.env.REACT_APP_API_URL}/admin/update`, {
        _id: id,
        firstname: selectedpatient.firstname,
        age: selectedpatient.age,
        preferedHumidity: selectedpatient.preferedHumidity,
        preferedTemperature: selectedpatient.preferedTemperature

      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (Result.status === 200) {
        setmodalstate(false);
        alert("Data updated!!");
        const updatedData = await axios.get(`${process.env.REACT_APP_API_URL}/Homepage/`);//call immdetaily becoz useeffect will take some time even if u put async there call again get request better.
        setPatientData(updatedData.data.data);
        console.log("Updated data fetched successfully:", updatedData.data.data);
        //Navigate('/AdminHomepage');
        console.log("Details successfully Updated!!");
      }
    } catch (error) {
      console.log("can't reach to request pls check request ", error);
    }

  }
  async function handeldelete(id) {
    try {
      const token = localStorage.getItem("adminToken");
      const Result = await axios.delete(`${process.env.REACT_APP_API_URL}/admin/delete`, {
        data: { Id: id },
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (Result.status == 200) {
        const load_data_again = await axios.get(`${process.env.REACT_APP_API_URL}/Homepage/`);
        setPatientData(load_data_again.data.data);
        console.log("Updated data fetched successfully:", load_data_again.data.data);
        console.log("Succesfully Deleted!!");
      }
    } catch (error) {
      console.log("can not reached the request ", error);
    }
  }

  return (
    <>
      <div className="homepage-container">
        {/* Header */}
        <div className="homepage-header">
          <div className="header-title">Home Temperature Monitor</div>
          <Button variant="info" onClick={adddatapage}>Add New Room</Button>
        </div>

        {/* Title */}
        <h3 className="page-title">Room Temperature Overview</h3>

        {/* Room Cards */}
        {PatientData.map((patient) => (
          <div key={patient._id} className="room-card">
            <div className="room-header">
              <div className="room-name">
                <span
                  className={`status-indicator ${patient.temperature < patient.preferedTemperature ? "red": "green"
                    }`}

                ></span>
                {patient.firstname}'s Bedroom
              </div>
            </div>
            <div className="room-stats">
              <span className="room-temperature">{patient.temperature}°C</span>
              <span className="room-humidity">{patient.humidity}%</span>
            </div>
            <div className="room-details">
              <p>
                Resident Name: {patient.firstname} {patient.lastname}
              </p>
              <p>Resident Age: {patient.age}</p>
              <p>Preferred Temp: {patient.preferedTemperature}°C</p>
              <p>Preferred Humidity: {patient.preferedHumidity}%</p>
              <p><Button variant="primary" onClick={() => openmodal(patient)}>Edit</Button></p>
              <p><Button variant="danger" onClick={() => handeldelete(patient._id)}>Delete</Button></p>
              <p><Button variant="info" onClick={()=>sendmessage(patient.temperature)}>Info</Button></p>
            </div>
            {expandedDetails === patient._id && (
              <div className="dropdown-content">
                <p>
                  <strong>Current temperature:</strong> {patient.temperature}°C
                </p>
                <div className="temperature-controls">
                  <p>
                  
                    <strong>Min {patient.mintemp}°C</strong>
                    <button
                      className="control-button"
                      onClick={() =>
                        updateTemperature(patient._id, "min", "decrease")
                      }
                    >
                      -
                    </button>
                    <span className="control-value">
                      {minTemperature[patient._id]}°C
                    </span>
                    <button
                      className="control-button"
                      onClick={() =>
                        updateTemperature(patient._id, "min", "increase")
                      }
                    >
                      +
                    </button>
                  </p>
                  <p>
                    <strong>Max  {patient.maxtemp}°C</strong>
                    <button
                      className="control-button"
                      onClick={() =>
                        updateTemperature(patient._id, "max", "decrease")
                      }
                    >
                      -
                    </button>
                    <span className="control-value">
                      {maxTemperature[patient._id]}°C
                    </span>
                    <button
                      className="control-button"
                      onClick={() =>
                        updateTemperature(patient._id, "max", "increase")
                      }
                    >
                      +
                    </button>
                  </p>
                </div>
                <div className="toggle-controls">
                  <p>
                    <strong>Notifications</strong>
                    <button
                      className={`toggle-switch ${toggles[patient._id]?.notifications ? "on" : "off"
                        }`}
                      onClick={() => handleToggle(patient._id)}
                    >
                      {toggles[patient._id]?.notifications ? "On" : "Off"}
                    </button>
                  </p>
                </div>
              </div>
            )}
            <div
              className="details-toggle"
              onClick={() => toggleDetails(patient._id)}
            >
              {expandedDetails === patient._id ? "Collapse ▲" : "Details ▼"}
            </div>
          </div>
        ))}
      </div>

      <Modal show={modalstate} onHide={closemodal}>
        <ModalBody className="p-4 bg-light rounded shadow-lg">
          <h5 className="text-center text-primary mb-4">
            <i class="bi bi-pencil-square me-2"></i>Edit Patient Details
          </h5>
          <div className="mb-3">
            <label className="form-label">
              <i class="bi bi-person-fill me-2"></i>Name
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter name"
              value={selectedpatient?.firstname || ""}
              onChange={handel_modal_firstname}
              autoComplete="off"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">
              <i class="bi bi-calendar-event-fill me-2"></i>Age
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter age"
              value={selectedpatient?.age || ""}
              onChange={handel_modal_age}
              autoComplete="off"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">
              <i class="bi bi-droplet-half me-2"></i>Preferred Humidity
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter preferred humidity"
              value={selectedpatient?.preferedHumidity || ""}
              onChange={handel_modal_prehum}
              autoComplete="off"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">
              <i class="bi bi-thermometer-half me-2"></i>Preferred Temperature
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter preferred temperature"
              value={selectedpatient?.preferedTemperature || ""}
              onChange={handel_modal_preTemp}
              autoComplete="off"
            />
          </div>
          <div className="d-flex justify-content-end">
            <button
              className="btn btn-primary d-flex align-items-center"
              onClick={() => handel_modal_click(selectedpatient._id)}
            >
              <i class="bi bi-check-circle-fill me-2"></i>Submit
            </button>
          </div>
        </ModalBody>
      </Modal >
    </>
  );
}

export default AdminHomepage;
