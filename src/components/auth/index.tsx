import React, { useEffect, useState } from "react"

import { SignInButton } from "./signIn";
import { SignOutButton } from "./signOut";
const logo = require("../../svlogo.PNG");
const AuthPage = () => {
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
                {isAuthenticated ? <SignOutButton handleAuth={handleAuth} /> : <SignInButton handleAuth={handleAuth} />}
            </div></>
    )
}

export default AuthPage;