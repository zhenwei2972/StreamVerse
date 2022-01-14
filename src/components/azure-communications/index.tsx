import { AzureCommunicationTokenCredential, CommunicationUserIdentifier } from '@azure/communication-common';
import {
  CallComposite,
  CallAdapter,
  createAzureCommunicationCallAdapter,
  ChatComposite,
  ChatAdapter,
  createAzureCommunicationChatAdapter,
  fromFlatCommunicationIdentifier
} from '@azure/communication-react';
import React, { useEffect, useMemo, useState } from 'react';

function AzureCall(): JSX.Element {
    const endpointUrl = (process.env.REACT_APP_AC_CONNECTION_STRING as string);
    const userId = (process.env.REACT_APP_AC_IDENTITY as string);
    const displayName = 'Dohn Joe';
    const token = (process.env.REACT_APP_AC_UAT as string);
    const groupId = (process.env.REACT_APP_AC_IDENTITY as string);
    const [callAdapter, setCallAdapter] = useState<CallAdapter>();
    const threadId = '<Get thread id from chat service>';
    const [chatAdapter, setChatAdapter] = useState<ChatAdapter>();

    // We can't even initialize the Chat and Call adapters without a well-formed token.
    const credential = useMemo(() => {
        try {
            return new AzureCommunicationTokenCredential(token);
        } catch {
            console.error('Failed to construct token credential');
            return undefined;
        }
    }, [token]);

    useEffect(() => {
            const createAdapter = async (): Promise<void> => {
            setChatAdapter(
                await createAzureCommunicationChatAdapter({
                endpoint: endpointUrl,
                userId: fromFlatCommunicationIdentifier(userId) as CommunicationUserIdentifier,
                displayName,
                credential: new AzureCommunicationTokenCredential(token),
                threadId
                })
            );
            setCallAdapter(
                await createAzureCommunicationCallAdapter({
                userId: fromFlatCommunicationIdentifier(userId) as CommunicationUserIdentifier,
                displayName,
                credential: new AzureCommunicationTokenCredential(token),
                locator: { groupId }
                })
            );
        };
        createAdapter();
    }, []);

    if (!!callAdapter && !!chatAdapter) {
        return (
        <div style={{ height: '100vh', display: 'flex' }}>
            <div style={{ width: '50vw' }}>
            <ChatComposite adapter={chatAdapter} />
            </div>
            <div style={{ width: '50vw' }}>
            <CallComposite adapter={callAdapter} />
            </div>
        </div>
        );
    }
    if (credential === undefined) {
        return <h3>Failed to construct credential. Provided token is malformed.</h3>;
    }
    return <h3>Initializing...</h3>;
}

export default AzureCall;