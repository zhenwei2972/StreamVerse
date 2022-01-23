import React, { useEffect, useState } from "react"

import { SignInButton } from "./signIn";
import { SignOutButton } from "./signOut";

const AuthPage = props => {
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

    return(
        <div>
            { isAuthenticated ? <SignOutButton handleAuth={handleAuth} /> : <SignInButton handleAuth={handleAuth} /> }
        </div>
    )
}

export default AuthPage;