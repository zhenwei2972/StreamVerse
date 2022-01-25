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
  StatefulCallClient,
  ControlBar,
  EndCallButton,
  usePropsFor,
  CameraButton,
  DevicesButton,
} from '@azure/communication-react';
import { AzureCommunicationTokenCredential } from '@azure/communication-common';
import { v1 as generateGUID } from 'uuid';
import { EndCallBtn } from './callingcomponents';
import { CameraBtn } from './callingcomponents';
import { GroupLocator } from '@azure/communication-calling';
import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { useNavigate  } from "react-router-dom";
import { IContextualMenuProps, mergeStyles, Stack } from '@fluentui/react';
import { CommandBar, ICommandBarItemProps } from '@fluentui/react/lib/CommandBar';
function StartPage(): JSX.Element {
  const componentMainDivStyle = {
    display: 'flex',
    border: 'solid 0.5px lightgray',
    height: '24rem',
    alignItems: 'center',
    justifyContent: 'center'
  };
  // If you don't want to provide custom icons, you can register the default ones included with the library.
  // This will ensure that all the icons are rendered correctly.
  const websocketUrl = process.env.REACT_APP_API_SOCKET || "";
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
  const [groupId, setGroupId] = useState('');
 
  // token bearer authorization header
  const config = {
    headers: { Authorization: `Bearer ${user.token}` }
  };

  // handle gamestate
  const [gameState, setGameState] = useState({
    'currentPlayer': user.name,
    'thisCanBeAnImageId': 1,
  });
  const [ws, setWs] = useState(new WebSocket(websocketUrl));

  // submit gamestate to server and other clients
  // call this method 
  // you can update the game state anywhere else by calling setGameState hooks
  const sendGameStateHandler = () => {
    ws.send(JSON.stringify({ type: "update", groupId: groupId, gameState: gameState}));
  }

  // called after joining group call to register client at server websocket
  const initGameState = (guid: string) => {
    ws.send(JSON.stringify({ type: "update", groupId: guid, gameState: gameState}));
  }

  // send and receive gamestate from backend
  useEffect(() => {
    ws.onopen = () => {
      console.log('WebSocket Connected');
    }
  
    ws.onmessage = (e) => {
      const gamestate = JSON.parse(e.data);
      // over here can update game state
      // for currentplayer use user.name instead of whatever that gets passed here
      setGameState({
        'currentPlayer': user.name,
        'thisCanBeAnImageId': 1,
      });
      console.log(gamestate);
    }
  
    return () => {
      ws.onclose = () => {
        console.log('WebSocket Disconnected');
        setWs(new WebSocket(websocketUrl));
      }
    }
  }, [ws.onmessage, ws.onopen, ws.onclose, gameState]);
  // end of gamestate

  // end call: to be called to remove ongoing thread from database
  const endCallHandler = () => {
    ws.send(JSON.stringify({ type: "end", groupId: groupId }));
    ws.close() // gracefully shutdown websocket after default 30sec timeout. terminate() for alternative.

    axios.post(process.env.REACT_APP_API_ENDPOINT + '/chat/endChat', {
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
        let guid = response.data.groupId;
        if (guid !== undefined && guid !== null) {
          setThreadId(response.data.threadId);
          // setGroupId(guid);
          setCall(callAgent.join( { groupId: guid } ));
          initGameState(guid);
          setGroupId(guid);
        } else {
          // if no thread or match, create group call
          let guid = createGroupId();
          axios.post(process.env.REACT_APP_API_ENDPOINT + '/chat/createThread', {
              playerEmail: user.email,
              groupId: guid.groupId
            },
            config
          ).then(function (response) {
              setThreadId(response.data.threadId);
              setCall(callAgent.join( guid ));
              initGameState(guid.groupId);
              setGroupId(guid.groupId);
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
                      <Stack className={mergeStyles({ height: '100%' })}>
                  <ControlBar layout="floatingTop">
                  <EndCallButton onClick={endCallHandler}></EndCallButton>
                  <CameraBtn></CameraBtn>
                  <DevicesButton onClick={sendGameStateHandler} ></DevicesButton>
                  
                    </ControlBar>
                    </Stack>
                   <CallingComponents />
                 
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