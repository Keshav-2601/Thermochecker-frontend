import React from "react";
//import PubNub from 'pubnub';
import { Link } from "react-router-dom";
import Adminpage from "./Adminpage.js";
const pubnub = new pubnub({
    publishKey: 'pub-c-006ed63e-75db-496c-84cb-3730599207ad',
    subscribeKey: 'sub-c-3f839898-4bca-4559-93e5-44187b29f3aa',
    ssl: true
});
async function sendmessage() {
    const message = {
        "text": "Temperature is too high"//josn format
    }
    try {
        await pubnub.publish({
            "channel": "pi_channel",
            "message": message,
        });
        console.log("susceesuly reached the msg!!")
    } catch (error) {
        console.log("some error happend ", error);
    }
}
function Homepage() {
    return (
        <>
            <button onClick={sendmessage}>Send Temperature Alert</button>//basically layout to send data from pubnub to pi400 using This
            <Link to="/admin">
                <Adminpage />
            </Link>
            <h3>
            //thta's how I am goona return it right?
                This is the HomePage, Here we Will show Temperatur for Rooms
            </h3>
        </>
    )
}
export default Homepage;