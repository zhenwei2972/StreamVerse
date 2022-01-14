import React from "react"

import { useIsAuthenticated } from "@azure/msal-react";
import { SignInButton } from "./signIn";
import { SignOutButton } from "./signOut";

import { AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";

import ProfileContent from "./profile";

const AuthPage = props => {
    const isAuthenticated = useIsAuthenticated();

    return(
        <div>
            <AuthenticatedTemplate>
                <ProfileContent />
                <p>You only see this when you are signed in.</p>
            </AuthenticatedTemplate>
            <UnauthenticatedTemplate>
                <p>You only see this when you are signed out.</p>
            </UnauthenticatedTemplate>
            <h6>Test sign msal sign in.</h6>
            { isAuthenticated ? <SignOutButton /> : <SignInButton /> }
        </div>
    )
}

export default AuthPage;