import React from "react";
import { useAuth0 } from '@auth0/auth0-react';

function Login() {
    const { loginWithRedirect, isAuthenticated } = useAuth0();
    return (
        !isAuthenticated && (
            <button type="submit" id="loginBtn" onClick={() => loginWithRedirect()}>Login/Signup</button>
        )
    );
}

export default Login;