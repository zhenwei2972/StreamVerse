import { AzureCommunicationTokenCredential, CommunicationUserIdentifier } from '@azure/communication-common';

import {
  CallComposite,
  CallAdapter,
  createAzureCommunicationCallAdapter,
  ChatComposite,
  ChatAdapter,
  createAzureCommunicationChatAdapter,
  fromFlatCommunicationIdentifier,
  CallCompositeOptions,
  CompositeLocale,
} from '@azure/communication-react';

import { v1 as generateGUID } from 'uuid';
import { GroupLocator } from '@azure/communication-calling';

import React, { useEffect, useMemo, useState } from 'react';

const { CallClient, VideoStreamRenderer, LocalVideoStream } = require('@azure/communication-calling');

function AzureCall(): JSX.Element {
    const endpointUrl = (process.env.REACT_APP_AC_CONNECTION_STRING as string);
    const userId = (process.env.REACT_APP_AC_IDENTITY as string);
    const displayName = 'Dohn Joe';
    const token = (process.env.REACT_APP_AC_UAT as string);
    const [callAdapter, setCallAdapter] = useState<CallAdapter>();

    const threadId = '19:vazTrmkjnzlvLH6wMUhSlG3WuHls8Oszw3PzZqvOo8Y1@thread.v2';
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

    const createGroupId = (): GroupLocator => ({ groupId: generateGUID() });

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
            const groupId = createGroupId();
            setCallAdapter(
                await createAzureCommunicationCallAdapter({
                userId: fromFlatCommunicationIdentifier('8:acs:b9f75e0c-81ee-4cf1-87c2-20eab7fc01ef_0000000f-1636-b451-5504-574822006d4e') as CommunicationUserIdentifier,
                displayName,
                credential: new AzureCommunicationTokenCredential('eyJhbGciOiJSUzI1NiIsImtpZCI6IjEwMyIsIng1dCI6Ikc5WVVVTFMwdlpLQTJUNjFGM1dzYWdCdmFMbyIsInR5cCI6IkpXVCJ9.eyJza3lwZWlkIjoiYWNzOmI5Zjc1ZTBjLTgxZWUtNGNmMS04N2MyLTIwZWFiN2ZjMDFlZl8wMDAwMDAwZi0xNjM2LWI0NTEtNTUwNC01NzQ4MjIwMDZkNGUiLCJzY3AiOjE3OTIsImNzaSI6IjE2NDI2NjI3OTMiLCJleHAiOjE2NDI3NDkxOTMsImFjc1Njb3BlIjoidm9pcCxjaGF0IiwicmVzb3VyY2VJZCI6ImI5Zjc1ZTBjLTgxZWUtNGNmMS04N2MyLTIwZWFiN2ZjMDFlZiIsImlhdCI6MTY0MjY2Mjc5M30.bAQva-KTRRuax4hMHING4UVUMatdaiZIDKICro6fX_61Mpb6AZKkjVG7neoT4sXLoQp_zzGcZmjcNgWXWJHJrUKEJ4F-Fo1gyghM374pURd7v49jc-FZYy7fcC6Sh7jByBWQP6W1qonkx9sx8lTUiEdRTwyDu6dnxUChPbCAfzFX6e-lhRLT3JS8Qb_i8O1Y7ndb1q0nDFcNs27xt5zb6mH5yq7bpI6Oi79x5zoUtmu84lLFjidBDhfN6E83YJPuhsS7Bgl56Ur0jEY03HSN6TvJrMDpHALf-3_UL7e0bix2oqrmCtWRCw51CXM-wb_VPioYjf01o77aKQ8_fkKEPw'),
                locator: groupId
                })
            );
        };
        createAdapter();
    }, []);

    if (!!callAdapter && !!chatAdapter) {
        return (
        <div style={{ height: '100vh', display: 'flex' }}>
            {/* <div style={{ width: '50vw' }}>
            <ChatComposite adapter={chatAdapter} />
            </div> */}
            <div style={{ width: '50vw' }}>
                <CallComposite adapter={callAdapter} />
            </div>
            <h3>Stream Verse - the language learning game show</h3>
        </div>
        );
    }
    if (credential === undefined) {
        return <h3>Failed to construct credential. Provided token is malformed.</h3>;
    }
    return <h3>Initializing...</h3>;
}

export default AzureCall;