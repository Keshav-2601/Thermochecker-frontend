import React, { useEffect, useState } from "react";
import PubNub from "pubnub";
import "../styling/Homepage.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";



function Homepage() {
  const [PatientData, setPatientData] = useState([]);
  const [expandedDetails, setExpandedDetails] = useState(null);
  const [minTemperature, setMinTemperature] = useState({});
  const [maxTemperature, setMaxTemperature] = useState({});
  const [toggles, setToggles] = useState({});

  const navigate=useNavigate();

  async function sendheaterInfo() {
    const pubusertoken=localStorage.getItem("Pubnub_user_token");

    const pubnub=new PubNub({
      publishKey: process.env.REACT_APP_PUBNUB_PUBLISH_KEY,
      subscribeKey: process.env.REACT_APP_PUBNUB_SUBSCRIBE_KEY,
      ssl: process.env.REACT_APP_PUBNUB_SSL === 'true', 
      secretKey:process.env.REACT_APP_SECRET_KEY,
      userId: process.env.REACT_APP_PUBNUB_USER_ID, 
      authKey: pubusertoken,
      cryptoModule: PubNub.CryptoModule.aesCbcCryptoModule({ cipherKey: 'pubnubenigma' })
    })
    pubnub.subscribe({
      channels:["pi_channel"],
    })
    pubnub.addListener({
      message: function(event) {
        console.log("Message received:", event.message);
      },
      status: function(statusEvent) {
        if (statusEvent.category === "PNConnectedCategory") {
          console.log("Successfully subscribed to pi_channel");
        }
      }
    });
  } 
  useEffect(() => {
    async function fetchData() {
      try {
        const result = await axios.get(`${process.env.REACT_APP_API_URL}/Homepage/`);
        setPatientData(result.data.data);
        console.log("Result from MongoDB is : ",result.data.data);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    }
    fetchData();
},[])
const toggleDetails = (id) => {
    setExpandedDetails(expandedDetails === id ? null : id);
  };

  const handleToggle = (id) => {
    setToggles({
      ...toggles,
      [id]: { notifications: !toggles[id]?.notifications },
    });
  };

  return (
  <>
  <div className="homepage-container">
      {/* Header */}
      <div className="homepage-header">
        <div className="header-title">Home Temperature Monitor</div>
        {/* <button className="alert-button" onClick={sendmessage}>
          Send Temperature Alert
        </button> */}
      </div>

      {/* Title */}
      <h3 className="page-title">Room Temperature Overview</h3>

      {/* Room Cards */}
      {PatientData.map((patient) => (
        <div key={patient._id} className="room-card">
          <div className="room-header">
            <div className="room-name">
              <span
                className={`status-indicator ${
                  patient.temperature > 23 ? "red" : "green"
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
          </div>
          <Button onClick={()=>sendheaterInfo()} type="Info">Heater Info</Button>
          {expandedDetails === patient._id && (
            <div className="dropdown-content">
              <p>
                <strong>Current temperature:</strong> {patient.temperature}°C
              </p>
              <div className="temperature-controls">
                <p>
                  <strong>Min</strong>
                  <button
                    className="control-button"
                    // onClick={() =>
                    //   updateminTemperature(patient._id, "min", "decrease")
                    // }
                  >
                    -
                  </button>
                  <span className="control-value">
                    {minTemperature[patient._id]}°C
                  </span>
                  <button
                    className="control-button"
                    // onClick={() =>
                    //   updatemaxTemperature(patient._id, "min", "increase")
                    // }
                  >
                    +
                  </button>
                </p>
                <p>
                  <strong>Max</strong>
                  <button
                    className="control-button"
                    // onClick={() =>
                    //   updatemaxTemperature(patient._id, "max", "decrease")
                    // }
                  >
                    -
                  </button>
                  <span className="control-value">
                    {maxTemperature[patient._id]}°C
                  </span>
                  <button
                    className="control-button"
                    // onClick={() =>
                    //   updatemaxTemperature(patient._id, "max", "increase")
                    // }
                  >
                    +
                  </button>
                </p>
              </div>
              <div className="toggle-controls">
                <p>
                  <strong>Notifications</strong>
                  <button
                    className={`toggle-switch ${
                      toggles[patient._id]?.notifications ? "on" : "off"
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
   </>
  );
}

export default Homepage;
