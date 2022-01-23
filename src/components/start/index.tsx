import { registerIcons } from '@fluentui/react';
import { CallingComponents } from './callingcomponents';
import { Call, CallAgent } from '@azure/communication-calling';
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

function StartPage(): JSX.Element {
  // If you don't want to provide custom icons, you can register the default ones included with the library.
  // This will ensure that all the icons are rendered correctly.

  registerIcons({ icons: DEFAULT_COMPONENT_ICONS });
  console.log(localStorage.getItem("user") || "")
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
      const config = {
          headers: { Authorization: `Bearer ${user.token}` }
      };
      // find thread
      axios.post(process.env.REACT_APP_API_ENDPOINT + '/chat/findChat',{
          playerEmail: user.email,
        },config).then(function (response) {
        // handle success
        console.log(response)
        let groupId = response.data.groupId.groupId;
        if (groupId !== undefined && groupId !== null) {
          setCall(callAgent.join( groupId ));
        } else {
          // if no thread or match, create group call
          const groupId = createGroupId();
          axios.post(process.env.REACT_APP_API_ENDPOINT + '/chat/createThread', {
              playerEmail: user.email,
              groupId: groupId
          },config).then(function (response) {
              console.log(response)
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
                   <CallingComponents/>
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