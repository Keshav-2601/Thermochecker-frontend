import React, { useEffect, useState } from "react";
import PubNub from 'pubnub';
import { Link, Navigate, useNavigate } from "react-router-dom";
import Adminpage from "./Patientspage.js";
import axios from 'axios';
import { Alert, Modal, ModalBody } from "react-bootstrap";
import '../styling/AdminModal.css';
const pubnub = new PubNub({
  publishKey: process.env.REACT_APP_PUBNUB_PUBLISH_KEY,
  subscribeKey: process.env.REACT_APP_PUBNUB_SUBSCRIBE_KEY,
  ssl: process.env.REACT_APP_PUBNUB_SSL === 'true', // Convert string to boolean
  userId: process.env.REACT_APP_PUBNUB_USER_ID, // Assign a unique ID
});

async function sendmessage() {
  const message = {
    "text": "Temperature is too high"
  };
  console.log("Attempting to send message:", message);
  try {
    const response = await pubnub.publish({
      "channel": "pi_channel",
      "message": message,
    });
    console.log("Message successfully sent! Response:", response);
  } catch (error) {
    console.log("An error occurred:", error);
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
        const result = await axios.get('http://localhost:3000/Homepage/'); // Correct URL
        setPatientData(result.data.data); // Access the data correctly
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
      const Result = await axios.put('http://localhost:3000/admin/update', {
        _id: id,
        firstname: selectedpatient.firstname,
        age: selectedpatient.age,
        preferedHumidity: selectedpatient.preferedHumidity,
        preferedTemperature: selectedpatient.temperature,

      })
      if (Result.status(204)) {
        Alert("Data updated!!");
        console.log("Details successfully Updated!!");
      }
    } catch (error) {
      console.log("can't reach to request pls check request ", error);
    }
  }
  async function handeldelete(id) {
    try {
      const Result = await axios.delete("htpp://localhost:3000/admin/delete", {
        data: { Id: id },
      });
      if (Result.status == 200) {
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
          <button className="alert-button" onClick={sendmessage}>
            Send Temperature Alert
          </button>
          <button>Add New Room</button>
        </div>

        {/* Title */}
        <h3 className="page-title">Room Temperature Overview</h3>

        {/* Room Cards */}
        {PatientData.map((patient) => (
          <div key={patient._id} className="room-card">
            <div className="room-header">
              <div className="room-name">
                <span
                  className={`status-indicator ${patient.temperature > 23 ? "red" : "green"
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
              <p><button onClick={() => openmodal(patient)}>Edit</button></p>
              <p><button onClick={() => handeldelete(patient._id)}>Delete</button></p>
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
