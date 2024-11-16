import React from "react";
import PubNub from 'pubnub';
import { Link } from "react-router-dom";
import Adminpage from "./Adminpage.js";

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
    return (
        <>
            <button onClick={sendmessage}>Send Temperature Alert</button>
            {/* <Link to="/admin">
                <Adminpage />
            </Link> */}
            <h3>
                This is the HomePage, Here we Will show Temperature for Rooms
            </h3>
        </>
    );
}

export default Homepage;
