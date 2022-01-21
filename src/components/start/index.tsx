
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
function StartPage(): JSX.Element {
  // If you don't want to provide custom icons, you can register the default ones included with the library.
  // This will ensure that all the icons are rendered correctly.

  registerIcons({ icons: DEFAULT_COMPONENT_ICONS });
  const userAccessToken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjEwMyIsIng1dCI6Ikc5WVVVTFMwdlpLQTJUNjFGM1dzYWdCdmFMbyIsInR5cCI6IkpXVCJ9.eyJza3lwZWlkIjoiYWNzOmI5Zjc1ZTBjLTgxZWUtNGNmMS04N2MyLTIwZWFiN2ZjMDFlZl8wMDAwMDAwZi0xYmUxLTY4MTctODk3NS1jOTNhMGQwMDFjNjMiLCJzY3AiOjE3OTIsImNzaSI6IjE2NDI3NTc4NjYiLCJleHAiOjE2NDI4NDQyNjYsImFjc1Njb3BlIjoidm9pcCIsInJlc291cmNlSWQiOiJiOWY3NWUwYy04MWVlLTRjZjEtODdjMi0yMGVhYjdmYzAxZWYiLCJpYXQiOjE2NDI3NTc4NjZ9.rfhHXtLLYyVSjHvNPDtLeSkmicZeMUnTMW5HTQp6EoUsr8NMjgSKqt43AndqATpXflFMSjUoadeM0TCo-gKMf4oyo9na2uGyhBmeFHOJjENXdSS5W8ds9AMUGKUqjyCPSNVf2vs4_Zok6lxvKUT1mbi3ycw_MQg42P8f1yYtpsvGiWUFb2uQDXYb-adKL2fu_PjWy3BG30hvGxfgjWIeup9-p2ajqFtdb3WxhvRH6z-fuFBF05Y-6g4Gk8ZnP1iql2P9vg1bcClRD7bbG7xsbflT7ox98YwEUHTO7L0JX9Wi1p4K9yEqHMHIb8ol683eW3Jl0wPGdgOYXEYXp3VSAg';
  const userId = '8:acs:b9f75e0c-81ee-4cf1-87c2-20eab7fc01ef_0000000f-1be1-6817-8975-c93a0d001c63';
  const tokenCredential = useMemo(() => {
    return new AzureCommunicationTokenCredential(userAccessToken);
  }, [userAccessToken]);
  const createGroupId = (): GroupLocator => ({ groupId: generateGUID() });
  
  //const groupId = '61e8f304688d6312b122e577';
  const displayName = 'Zhen Wei Lee';

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
      const groupId = createGroupId();
      setCall(callAgent.join( groupId ));
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