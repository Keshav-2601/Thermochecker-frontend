import React, { useEffect, useState } from "react";
import PubNub from 'pubnub';
import { Link } from "react-router-dom";
import Adminpage from "./Patientspage.js";
import axios from 'axios';
const pubnub = new PubNub({
    publishKey: 'pub-c-006ed63e-75db-496c-84cb-3730599207ad',
    subscribeKey: 'sub-c-3f839898-4bca-4559-93e5-44187b29f3aa',
    ssl: true,
    userId: "testUser1" // Set this to a unique ID, such as a username or UUID
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

function Homepage() {
    const[PatientData,setPatientData]=useState([]);
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
    return (
        <>
            <button onClick={sendmessage}>Send Temperature Alert</button>
            {/* <Link to="/admin">
                <Adminpage />
            </Link> */}
            <h3>
                This is the HomePage, Here we Will show Temperature for Rooms
            </h3>
            <div>
                <h4>Patient Data:</h4>
                {PatientData.length > 0 ? (
                    <ul>
                        {PatientData.map((patient) => (
                            <li key={patient._id}>
                                Name: {patient.firstname}, Age: {patient.age}, Temperature: {patient.temperature}°C, Priority: {patient.priority}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No patient data available.</p>
                )}
            </div>
            
        </>
    );
}

export default Homepage;
