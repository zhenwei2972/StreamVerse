// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ControlBarButton } from '@azure/communication-react';
import { IButtonProps, IStackTokens, Icon, Label, Text } from '@fluentui/react';
import { DefaultButton, PrimaryButton } from '@fluentui/react/lib/Button';
import {
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
import React, { useState } from 'react';
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
        <Stack horizontal tokens={stackTokens}>
            <DefaultButton style = {{marginTop:'2rem',  borderRadius: 0.5}}text="Standard" onClick={_alertClicked} allowDisabledFocus disabled={disabled} checked={checked} />
            <DefaultButton style = {{marginTop:'2rem',  borderRadius: 0.5}}text="Standard" onClick={_alertClicked} allowDisabledFocus disabled={disabled} checked={checked} />
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
                Walking a dog
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
        />
    );
};

export const CallingComponents = (): JSX.Element => {
    const exampleOptionsMenuProps: IContextualMenuProps = {
        items: [
            {
                key: '1',
                name: 'Choose Camera',
                iconProps: { iconName: 'LocationCircle' },
                onClick: () => alert('Choose Camera Menu Item Clicked!')
            }
        ]
    };

    const controlBarStyle = {
        root: {
            justifyContent: 'center'
        }
    };
    const componentMainDivStyle = {
        display: 'flex',
        height: '12rem',
        alignItems: 'center',
        justifyContent: 'center'
    };
    const [videoButtonChecked, setVideoButtonChecked] = useState<boolean>(false);
    const [audioButtonChecked, setAudioButtonChecked] = useState<boolean>(false);
    const [screenshareButtonChecked, setScreenshareButtonChecked] = useState<boolean>(false);

    return (
        <Stack className={mergeStyles({ height: '100%' })}>
            {/* GridLayout Component relies on the parent's height and width, so it's required to set the height and width on its parent. */}
            <div style={{ height: '60rem', width: '30rem', border: '1px solid' }}>
                <GridLayout>
                    <VideoTile displayName={'Tong Liang'} />
                    <VideoTile displayName={'Zhen Wei'} />
                </GridLayout>
            </div>

            {/* Control Bar with default set up */}
            <div style={componentMainDivStyle}>
                <Stack style={{ marginLeft:'2rem',width: '30rem',opacity: 0.95 }}>  
                    <ButtonDefaultExample />
                    <ButtonDefaultExample />
                </Stack>

                <ControlBar layout="floatingLeft" >
                  {/*}  <CameraButton checked={videoButtonChecked} onClick={() => setVideoButtonChecked(!videoButtonChecked)} />
                    <MicrophoneButton checked={audioButtonChecked} onClick={() => setAudioButtonChecked(!audioButtonChecked)} /> */}
                    <EndCallButton />

                </ControlBar>


            </div>
        </Stack>
    );
};