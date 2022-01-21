import React from "react";

const { CallClient } = require('@azure/communication-calling');
const { AzureCommunicationTokenCredential} = require('@azure/communication-common');
const { AzureLogger, setLogLevel } = require("@azure/logger");

function VideoCall() : JSX.Element {
    
    return <h3>Initializing...</h3>
}

export default VideoCall;