// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import DialogBasicExample from "./dialog";
//import "react-sliding-pane/dist/react-sliding-pane.css";
import { ControlBarButton } from '@azure/communication-react';
import { IButtonProps, IStackTokens, Icon, Label, Text } from '@fluentui/react';
import { DefaultButton, PrimaryButton } from '@fluentui/react/lib/Button';

import {
    usePropsFor,
    VideoGallery,
    CameraButton,
    ControlBar,
    EndCallButton,
    GridLayout,
    MicrophoneButton,
    DevicesButton,
    ScreenShareButton,
    VideoTile
} from '@azure/communication-react';

import { IContextualMenuProps, mergeStyles, Stack } from '@fluentui/react';
import React, { useState, Component } from 'react';
const stackTokens: IStackTokens = { childrenGap: 40 };

export interface IButtonExampleProps {
    // These are set based on the toggles shown above the examples (not needed in real code)
    disabled?: boolean;
    checked?: boolean;
}

function _alertClicked(): void {
    alert('Clicked');
}

export const ButtonDefaultExample: React.FunctionComponent<IButtonExampleProps> = props => {
    const { disabled, checked } = props;

    return (
        <Stack tokens={stackTokens}>
            <DefaultButton style={{ marginTop: '2rem', borderRadius: 0.5 }} text="Dog walking a human" onClick={_alertClicked} />
            <DefaultButton style={{ marginTop: '2rem', borderRadius: 0.5 }} text="Human walking a dog" onClick={_alertClicked} />
            <DefaultButton style={{ marginTop: '2rem', borderRadius: 0.5 }} text="Dog walking a human" onClick={_alertClicked} />
            <DefaultButton style={{ marginTop: '2rem', borderRadius: 0.5 }} text="Human walking a dog" onClick={_alertClicked} />
        </Stack>

    );
};

export const EndCallButtonCustomExample: () => JSX.Element = () => {
    const customOnRenderIcon = (): JSX.Element => {
        return <Icon key={'endCallCustomIconKey'} iconName={'DeclineCall'} style={{ color: 'black', fontSize: '25px' }} />;
    };

    const customOnRenderText = (/*props?: IButtonProps*/): JSX.Element => {
        return (
            <Label key={'endCallCustomLabelKey'} style={{ color: 'black' }}>
                NIL
            </Label>
        );
    };

    return (
        <EndCallButton
            style={{ background: 'cyan' }}
            key={'endCallCustomBtnKey'}
            showLabel={true}
            onRenderIcon={customOnRenderIcon}
            onRenderText={customOnRenderText}
            onClick={()=>""}
        />
    );
};
const componentMainDivStyle = {
    display: 'flex',
    border: 'solid 0.5px lightgray',
    height: '24rem',
    alignItems: 'center',
    justifyContent: 'center'
  };
//mock users to test how video gallery performs
const MockLocalParticipant = {
    userId: 'user1',
    displayName: 'You',
    state: 'Connected',
    isMuted: true
};

const MockRemoteParticipants = [
    {
        userId: 'user2',
        displayName: 'Tong Liang'
    }

];
export const EndCallBtn = (props:any): JSX.Element =>{
   
    const endCallProps = usePropsFor(EndCallButton);
    return (
        <div>
        {endCallProps && <EndCallButton {...endCallProps} />}
        </div>
    );
};
export const CameraBtn = (props:any): JSX.Element =>{
   
    const cameraProps = usePropsFor(CameraButton);
    return (
        <div>
         {cameraProps && <CameraButton {...cameraProps} />}
        </div>
    );
};

export const CallingComponents = (props : any): JSX.Element => {
    const videoGalleryProps = usePropsFor(VideoGallery);
    const cameraProps = usePropsFor(CameraButton);
  

    return (
        <Stack className={mergeStyles({ height: '100%' })}>
            {/* GridLayout Component relies on the parent's height and width, so it's required to set the height and width on its parent. */}
           
            <ControlBar layout="floatingTop">
           
          
            </ControlBar>
          
            <div style={{  width: '100%', height: '100%', position:"absolute", }}>
            {/* styles={{ root: { border: 'solid 3px red' }  } } */}
                {videoGalleryProps && <VideoGallery  {...videoGalleryProps}   />}
            </div>
           
            
            {/*TBD 3 dot settings floating button with end call button and such, overlaid ontop of video feed at top right corner. */}

        </Stack>
    );
};