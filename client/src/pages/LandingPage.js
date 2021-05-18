import React from "react";
import Login from "../components/Login/Login";
import Homepage from "../components/Homepage/Homepage"
import { useAuth0 } from '@auth0/auth0-react';

function LandingPage() {

    const { isLoading } = useAuth0();

    // function renders loading sign if homepage has not loaded yet
    if (isLoading) return <div>Loading...</div>

    return (
        <>
            <Login />
            <Homepage />
        </>
    );
}

export default LandingPage;
