import React from "react";
import { PrimaryButton, DefaultButton } from '@fluentui/react/lib/Button';
import { useNavigate  } from "react-router-dom";

/**
 * Renders a button which, when selected, will open a popup for logout
 */
export const SignOutButton = props => {
    const navigate = useNavigate ();
    const handleLogout = () => {
        localStorage.setItem("user", "");
        props.handleAuth();
    }

    const handleStartChat = () => {
        navigate('/start', { replace: true })
    }
    const btnStyle = {
        backgroundColor: '#2766cc',
        color: 'white', marginTop: '1rem', borderRadius: 25, marginLeft: 140
    };
    const defaultBtnStyle = {
        marginTop: '1rem', borderRadius: 25, marginLeft: 140
    };

    return (
        <>
            <PrimaryButton style={btnStyle} text="Play" onClick={handleStartChat} />
            <DefaultButton style={defaultBtnStyle} text="Sign Out" onClick={handleLogout} />
        </>
    );
}