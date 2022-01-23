import React, { useState } from "react";
import { PrimaryButton, TextField } from '@fluentui/react/lib';
import axios from 'axios';

/**
 * Renders a button which, when selected, will open a popup for login
 */
export const SignInButton = props => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const handleLogin = () => {
        axios.post(process.env.REACT_APP_API_ENDPOINT + '/auth/login', {
            email: email,
            password: password
        }).then(function (response) {
            localStorage.setItem("user", JSON.stringify(response.data));
            props.handleAuth();
        }).catch(function (error) {
            console.log(error);
        });
    }

    return (
        <div>
            <TextField onChange={e => setEmail(e.target.value)} name="email" label="Email" />
            <TextField onChange={e => setPassword(e.target.value)} name="password" label="Password" />
            <PrimaryButton text="Sign in." onClick={handleLogin} />
        </div>
    );
}