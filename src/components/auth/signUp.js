import React, { useEffect, useState } from "react"
import { PrimaryButton, TextField, DefaultButton } from '@fluentui/react/lib';
import axios from 'axios';
import { BrowserRouter as Router, Link } from "react-router-dom";
import { SignOutButton } from "./signOut";
import { useNavigate  } from "react-router-dom";
/**
 * Renders a button which, when selected, will open a popup for login
 */
export const SignUpButton = props => {
    const [email, setEmail] = useState();
    const [name, setName] = useState();
    const [password, setPassword] = useState();
    const [age, setAge] = useState();
    const [gender, setGender] = useState();
    const [nationality, setNationality] = useState();
    const btnStyle = {
        backgroundColor: '#2766cc',
        color: 'white', marginTop: '1rem', borderRadius: 25, marginLeft: 140
    };
    const defaultBtnStyle = {
        marginTop: '1rem', borderRadius: 25, marginLeft: 140
    };
    const navigate = useNavigate ();
    
    const handleLogin = () => {
        axios.post(process.env.REACT_APP_API_ENDPOINT + '/auth/signUp', {
            email: email,
            password: password,
            age: age,
            gender: gender,
            name: name,
            nationality: nationality
        }).then(function (response) {
            localStorage.setItem("user", JSON.stringify(response.data));
            props.handleAuth();
            navigate('/start', { replace: true })
        }).catch(function (error) {
            console.log(error);
            alert('Error signing up. Please try again later.');
        });
    }

    const redirectToLogin = () => {
        navigate('/auth', { replace: true })
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
            }} onChange={e => setName(e.target.value)} name="name" label="Name" />
            <TextField styles={{
                fieldGroup: {
                    borderRadius: 259,
                }
            }}defaultValue ="" type="password" canRevealPassword={true} onChange={e => setPassword(e.target.value)} name="password" label="Password" />
            <TextField styles={{
                fieldGroup: {
                    borderRadius: 259,
                }
            }} onChange={e => setGender(e.target.value)} name="gender" label="Gender" />
            <TextField styles={{
                fieldGroup: {
                    borderRadius: 259,
                }
            }} onChange={e => setAge(e.target.value)} name="age" label="Age" />
            <TextField styles={{
                fieldGroup: {
                    borderRadius: 259,
                }
            }} onChange={e => setNationality(e.target.value)} name="nationality" label="Nationality" />
            <PrimaryButton style={btnStyle} text="Sign Up" onClick={handleLogin} />
            <DefaultButton style={defaultBtnStyle} text="Sign In" onClick={redirectToLogin} />
        </div>
    );
}

const logo = require("../../svlogo.PNG");
const SignUpPage = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleAuth = () => {
        setIsAuthenticated(!isAuthenticated)
    }

    useEffect(() => {
        let user = localStorage.getItem("user");
        if (user != undefined && user != null && user != "") {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    }, [isAuthenticated])

    return (
            <><img src={logo} style={{
                width: 180,
                height: 180,
                alignContent: "center",
                display: 'flex',
                justifyContent: 'center',
                marginLeft: 100,
                marginTop:130,
            }} />
            <div>
                {isAuthenticated ? <SignOutButton handleAuth={handleAuth} /> : <SignUpButton handleAuth={handleAuth} />}
            </div></>
    )
}

export default SignUpPage;