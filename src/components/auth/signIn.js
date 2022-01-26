import React, { useState } from "react";
import { PrimaryButton, TextField } from '@fluentui/react/lib';
import axios from 'axios';
import { BrowserRouter as Router, Link } from "react-router-dom";
/**
 * Renders a button which, when selected, will open a popup for login
 */
export const SignInButton = props => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const btnStyle = {
        backgroundColor: '#2766cc',
        color: 'white', marginTop: '1rem', borderRadius: 25, marginLeft: 140
    };
    const txtStyle = {

    }
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
        <div styles={{ paddingLeft: 200, }}>

            <TextField styles={{
                fieldGroup: {
                    borderRadius: 259,
                }
            }} onChange={e => setEmail(e.target.value)} name="email" label="Email" />
            <TextField styles={{
                fieldGroup: {
                    borderRadius: 259,
                }
            }}defaultValue ="test" canRevealPassword={true} onChange={e => setPassword(e.target.value)} name="password" label="Password" />
            <Link to='/start'>
            <PrimaryButton style={btnStyle} text="Sign in" onClick={handleLogin} />
            </Link>
        </div>
    );
}