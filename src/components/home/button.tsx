
import { IButtonProps, IStackTokens, Icon, Label, Text } from '@fluentui/react';
import { DefaultButton, PrimaryButton } from '@fluentui/react/lib/Button';
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

export const LoginBtn: React.FunctionComponent<IButtonExampleProps> = props => {
    const { disabled, checked } = props;

    return (
            <DefaultButton style={{ marginTop: '2rem', borderRadius: 0.5 }} text="Login" onClick={_alertClicked} />
    );
};