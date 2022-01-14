import React from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../../active-directory/authConfig";
import { PrimaryButton } from '@fluentui/react/lib/Button';

function handleLogin(instance) {
    instance.loginPopup(loginRequest).catch(e => {
        console.error(e);
    });
}

/**
 * Renders a button which, when selected, will open a popup for login
 */
export const SignInButton = () => {
    const { instance } = useMsal();

    return (
        <PrimaryButton text="Sign in." onClick={() => handleLogin(instance)} />
    );
}