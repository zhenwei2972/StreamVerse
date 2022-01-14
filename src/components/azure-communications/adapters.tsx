import { AzureCommunicationTokenCredential, CommunicationUserIdentifier } from '@azure/communication-common';
import {
  CallAdapter,
  createAzureCommunicationCallAdapter,
  ChatAdapter,
  createAzureCommunicationChatAdapter,
  fromFlatCommunicationIdentifier
} from '@azure/communication-react';
import React, { useEffect, useMemo, useState } from 'react';

function AzureCommunicationsAdapters(): JSX.Element {
    const endpointUrl = (process.env.REACT_APP_AC_CONNECTION_STRING as string);
    const userId = (process.env.REACT_APP_AC_IDENTITY as string);
    const displayName = 'Dohn Joe';
    const token = (process.env.REACT_APP_AC_UAT as string);
    const groupId = (process.env.REACT_APP_AC_IDENTITY as string);
    const [callAdapter, setCallAdapter] = useState<CallAdapter>();
    const threadId = '<Get thread id from chat service>';
    const [chatAdapter, setChatAdapter] = useState<ChatAdapter>();

    const credential = useMemo(() => {
        try {
          return new AzureCommunicationTokenCredential(token);
        } catch {
          console.error('Failed to construct token credential');
          return undefined;
        }
    }, [token]);
    
    useEffect(() => {
        if (credential !== undefined) {
          const createAdapter = async (credential: AzureCommunicationTokenCredential): Promise<void> => {
            setChatAdapter(
              await createAzureCommunicationChatAdapter({
                endpoint: endpointUrl,
                userId: fromFlatCommunicationIdentifier(userId) as CommunicationUserIdentifier,
                displayName,
                credential,
                threadId
              })
            );
            setCallAdapter(
              await createAzureCommunicationCallAdapter({
                userId: fromFlatCommunicationIdentifier(userId) as CommunicationUserIdentifier,
                displayName,
                credential,
                locator: { groupId }
              })
            );
          };
          createAdapter(credential);
        }
      }, [credential]);
    
      if (!!callAdapter && !!chatAdapter) {
        return <h1>Hooray! You set up adapters 🎉🎉🎉</h1>;
      }
      if (credential === undefined) {
        return <h3>Failed to construct credential. Provided token is malformed.</h3>;
      }
      return <h3>Initializing...</h3>;
}

export default AzureCommunicationsAdapters;