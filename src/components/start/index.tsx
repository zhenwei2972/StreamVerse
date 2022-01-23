import { registerIcons } from '@fluentui/react';
import { PrimaryButton } from '@fluentui/react/lib';
import { CallingComponents } from './callingcomponents';
import { Call, CallAgent, IncomingCall } from '@azure/communication-calling';
import {
  FluentThemeProvider,
  DEFAULT_COMPONENT_ICONS,
  CallClientProvider,
  CallAgentProvider,
  CallProvider,
  createStatefulCallClient,
  StatefulCallClient
} from '@azure/communication-react';
import { AzureCommunicationTokenCredential } from '@azure/communication-common';
import { v1 as generateGUID } from 'uuid';
import { GroupLocator } from '@azure/communication-calling';
import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { useNavigate  } from "react-router-dom";

function StartPage(): JSX.Element {
  // If you don't want to provide custom icons, you can register the default ones included with the library.
  // This will ensure that all the icons are rendered correctly.
  const navigate = useNavigate ();
  registerIcons({ icons: DEFAULT_COMPONENT_ICONS });
  const user = JSON.parse(localStorage.getItem("user") || "");
  const userAccessToken = user.spoolToken;
  const userId = user.spoolID;
  const tokenCredential = useMemo(() => {
    return new AzureCommunicationTokenCredential(userAccessToken);
  }, [userAccessToken]);
  const createGroupId = (): GroupLocator => ({ groupId: generateGUID() });
  
  const displayName = user.name;

  const [statefulCallClient, setStatefulCallClient] = useState<StatefulCallClient>();
  const [callAgent, setCallAgent] = useState<CallAgent>();
  const [call, setCall] = useState<Call>();
  const [threadId, setThreadId] = useState();

  const config = {
    headers: { Authorization: `Bearer ${user.token}` }
  };

  // end call
  const endCallHandler = () => {
    console.log("Ending call.");
    axios.post(process.env.REACT_APP_API_ENDPOINT + '/chat/endChat',
    {
      threadId: threadId
    }, config).then(response => {
      navigate('/', { replace: true })
    }).catch(function (error) {
      console.log(error);
    });
  }

  useEffect(() => {
    setStatefulCallClient(
      createStatefulCallClient({
        userId: { communicationUserId: userId }
      })
    );
  }, [userId]);

  useEffect(() => {
    if (callAgent === undefined && statefulCallClient) {
      const createUserAgent = async (): Promise<void> => {
        setCallAgent(await statefulCallClient.createCallAgent(tokenCredential, { displayName: displayName }));
      };
      createUserAgent();
    }
  }, [callAgent, statefulCallClient, tokenCredential, displayName]);

  useEffect(() => {
    if (callAgent !== undefined) {
      // find thread
      axios.post(process.env.REACT_APP_API_ENDPOINT + '/chat/findChat',{
          playerEmail: user.email,
        },config).then(function (response) {
        // handle success
        let groupId = response.data.groupId;
        if (groupId !== undefined && groupId !== null) {
          console.log("Group ID found: " + groupId)
          setThreadId(response.data.threadId);
          setCall(callAgent.join( { groupId: groupId } ));
        } else {
          // if no thread or match, create group call
          let groupId = createGroupId();
          axios.post(process.env.REACT_APP_API_ENDPOINT + '/chat/createThread', {
              playerEmail: user.email,
              groupId: groupId
            },
            config
          ).then(function (response) {
              setThreadId(response.data.threadId);
              setCall(callAgent.join( groupId ));
          }).catch(function (error) {
              console.log(error);
          });
        }
      }).catch(function (error) {
        // handle error
        console.log(error);
      }).then(function () {
        // always executed
      });
    }
  }, [callAgent]);

  return (
    <>
      <FluentThemeProvider>
        {statefulCallClient && (
          <CallClientProvider callClient={statefulCallClient}>
            {callAgent && (
              <CallAgentProvider callAgent={callAgent}>
                {call && (
                  <CallProvider call={call}>
                   <CallingComponents />
                   
                  <PrimaryButton text="End Call" onClick={endCallHandler} />
                  </CallProvider>
                )}
              </CallAgentProvider>
            )}
          </CallClientProvider>
        )}
      </FluentThemeProvider>
    </>
  );
}

export default StartPage;