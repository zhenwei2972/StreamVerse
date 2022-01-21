
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

import React, { useEffect, useMemo, useState } from 'react';
function StartPage(): JSX.Element {
  // If you don't want to provide custom icons, you can register the default ones included with the library.
  // This will ensure that all the icons are rendered correctly.

  registerIcons({ icons: DEFAULT_COMPONENT_ICONS });
  const userAccessToken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjEwMyIsIng1dCI6Ikc5WVVVTFMwdlpLQTJUNjFGM1dzYWdCdmFMbyIsInR5cCI6IkpXVCJ9.eyJza3lwZWlkIjoiYWNzOmI5Zjc1ZTBjLTgxZWUtNGNmMS04N2MyLTIwZWFiN2ZjMDFlZl8wMDAwMDAwZi0xYjYyLTRhOTAtZjc3NS1jOTNhMGQwMDA1ZTAiLCJzY3AiOjE3OTIsImNzaSI6IjE2NDI3NDk1MzUiLCJleHAiOjE2NDI4MzU5MzUsImFjc1Njb3BlIjoidm9pcCIsInJlc291cmNlSWQiOiJiOWY3NWUwYy04MWVlLTRjZjEtODdjMi0yMGVhYjdmYzAxZWYiLCJpYXQiOjE2NDI3NDk1MzV9.CVcOwaTVXB4RNiQaO-OQV7w9Cgoiaz4qL2v_a5PCLN5kr3nm5z1PuZzXHrtP8K2uak0SMyuxU1jKEyJqEuI982eWqQyh2fkI-dtnBousPC03cYA3bBN6rMpUPPgBg3MG3CTTvsCQgWnB8wYBBWWbYHfTDx6RVr0mpefNWvX0PLud14g5wZXd9OcNRkAWEbLWtsLpQUXQssI40krCfLX_iu-Mq1EyBDABKrGeJKZgm7j4YpNJdODZUKOeP79j31IVd9lHyVRklRUdy6S2TEp45rqBHj7WBecsNVBvTHN94W3QgKM0Aod4-Xnm0NHeXDayKZ3wuw_Kt31FM9gk-YjEJw';
  const userId = '8:acs:b9f75e0c-81ee-4cf1-87c2-20eab7fc01ef_0000000f-1b62-4a90-f775-c93a0d0005e0';
  const tokenCredential = useMemo(() => {
    return new AzureCommunicationTokenCredential(userAccessToken);
  }, [userAccessToken]);
  const groupId = '61e8f304688d6312b122e577';
  const displayName = 'Caleb Foster';

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
      setCall(callAgent.join({ groupId }));
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