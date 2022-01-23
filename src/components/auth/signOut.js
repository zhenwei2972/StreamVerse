import React from "react";
import { PrimaryButton } from '@fluentui/react/lib/Button';

/**
 * Renders a button which, when selected, will open a popup for logout
 */
export const SignOutButton = props => {
    const handleLogout = () => {
        localStorage.setItem("user", "");
        props.handleAuth();
    }

    return (
        <PrimaryButton text="Sign Out" onClick={handleLogout} />
    );
}