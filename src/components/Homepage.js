import React, { useEffect, useState } from "react";
import PubNub from "pubnub";
import "../styling/Homepage.css";
import axios from "axios";
const pubnub = new PubNub({
  publishKey: "pub-c-006ed63e-75db-496c-84cb-3730599207ad",
  subscribeKey: "sub-c-3f839898-4bca-4559-93e5-44187b29f3aa",
  ssl: true,
  userId: "testUser1",
});

async function sendmessage() {
  const message = { text: "Temperature is too high" };
  try {
    await pubnub.publish({ channel: "pi_channel", message });
    console.log("Message sent successfully!");
  } catch (error) {
    console.log("Error sending message:", error);
  }
}

function Homepage() {
  const [PatientData, setPatientData] = useState([]);
  const [expandedDetails, setExpandedDetails] = useState(null);
  const [minTemperature, setMinTemperature] = useState({});
  const [maxTemperature, setMaxTemperature] = useState({});
  const [toggles, setToggles] = useState({});



  useEffect(() => {
    async function fetchData() {
      try {
        const result = await axios.get("http://localhost:3000/Homepage/");
        setPatientData(result.data.data);
        console.log(result.data.data);
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

  // const updateTemperature = (id, type, operation) => {
  //   const updateState = type === "min" ? minTemperature : maxTemperature;
  //   const setState = type === "min" ? setMinTemperature : setMaxTemperature;

  //   setState({
  //     ...updateState,
  //     [id]: Math.max(
  //       0,
  //       Math.min(
  //         50, // Keep temperature in a valid range
  //         updateState[id] + (operation === "increase" ? 1 : -1)
  //       )
  //     ),
  //   });
  // };


  return (
  <>
  <div className="homepage-container">
      {/* Header */}
      <div className="homepage-header">
        <div className="header-title">Home Temperature Monitor</div>
        <button className="alert-button" onClick={sendmessage}>
          Send Temperature Alert
        </button>
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
