import React, { useEffect, useState } from "react";
import PubNub from "pubnub";
import "../styling/Homepage.css";

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
  const [expandedId, setExpandedId] = useState(null); // New state to track the expanded card

  useEffect(() => {
    // Mock data for testing purposes
    const mockData = [
      {
        _id: "1",
        firstname: "Steaven",
        age: 72,
        temperature: 22.3,
        priority: "High",
        preferredTemperature: 23,
      },
      {
        _id: "2",
        firstname: "Maria",
        age: 68,
        temperature: 20.1,
        priority: "Medium",
        preferredTemperature: 22,
      },
      {
        _id: "3",
        firstname: "Robert",
        age: 75,
        temperature: 23.0,
        priority: "Low",
        preferredTemperature: 23,
      },
      {
        _id: "4",
        firstname: "John",
        age: 79,
        temperature: 19.5,
        priority: "High",
        preferredTemperature: 21,
      },
      {
        _id: "5",
        firstname: "Elizabeth",
        age: 70,
        temperature: 21.1,
        priority: "Medium",
        preferredTemperature: 22,
      },
      {
        _id: "6",
        firstname: "Lily",
        age: 76,
        temperature: 19.7,
        priority: "Low",
        preferredTemperature: 21,
      },
    ];
    setPatientData(mockData);
  }, []);

  const toggleDetails = (id) => {
    setExpandedId(expandedId === id ? null : id); // Toggle expansion for the clicked card
  };

  return (
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
      <div className="rooms-grid">
        {PatientData.length > 0 ? (
          PatientData.map((patient) => (
            <div key={patient._id} className="room-card">
              {/* Room Header */}
              <div className="room-header">
                <div className="room-name">
                  <span
                    className={`status-indicator ${
                      patient.temperature > 23 ? "red" : "green"
                    }`}
                  ></span>
                  {patient.firstname}'s Bedroom
                  <span
                    className="dropdown-toggle"
                    onClick={() => toggleDetails(patient._id)}
                  >
                    ▼
                  </span>
                </div>
              </div>

              {/* Room Temperature */}
              <div className="room-temperature">{patient.temperature}°C</div>

              {/* Expanded Details */}
              {expandedId === patient._id && (
                <div className="room-expanded-details">
                  <p>Resident Age: {patient.age}</p>
                  <p>Priority: {patient.priority}</p>
                  <p>Preferred Temp: {patient.preferredTemperature}°C</p>
                </div>
              )}

              <div
                className="details-toggle"
                onClick={() => toggleDetails(patient._id)}
              >
                Details ▼
              </div>
            </div>
          ))
        ) : (
          <p className="no-data-message">No patient data available.</p>
        )}
      </div>
    </div>
  );
}

export default Homepage;
