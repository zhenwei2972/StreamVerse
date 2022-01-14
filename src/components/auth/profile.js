import { useState } from 'react'

import { ProfileData } from "./profileData";
import { callMsGraph } from "../../active-directory/graph";
import { loginRequest } from "../../active-directory/authConfig";
import { PrimaryButton } from '@fluentui/react/lib/Button';
import { useMsal } from "@azure/msal-react";


function ProfileContent() {
    const { instance, accounts } = useMsal();
    const [graphData, setGraphData] = useState(null);

    const name = accounts[0] && accounts[0].name;

    function RequestProfileData() {
        const request = {
            ...loginRequest,
            account: accounts[0]
        };

        // Silently acquires an access token which is then attached to a request for Microsoft Graph data
        instance.acquireTokenSilent(request).then((response) => {
            callMsGraph(response.accessToken).then(response => setGraphData(response));
        }).catch((e) => {
            instance.acquireTokenPopup(request).then((response) => {
                callMsGraph(response.accessToken).then(response => setGraphData(response));
            });
        });
    }

    return (
        <>
            <h5 className="card-title">Welcome {name}</h5>
            {graphData ? 
                <ProfileData graphData={graphData} />
                :
                <PrimaryButton text="Request Profile Information" onClick={RequestProfileData} />
            }
        </>
    );
};

export default ProfileContent;