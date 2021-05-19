import React from "react";
// import Route from "react-router-dom";
import Login from "../components/Login/Login";
import Homepage from "../components/Homepage/Homepage"
import { useAuth0 } from '@auth0/auth0-react';
// import { withAuthenticationRequired } from '@auth0/auth0-react';
import Loading from "../components/Loading/Loading";

function LandingPage() {

    const { isLoading, error } = useAuth0();

    if (error) {
        return <div>Oops... {error.message}</div>;
    }

    if (isLoading) {
        return <Loading />;
    }

    return (
        <>
            <Login />
            {/* <Route
                componoent={withAuthenticationRequired(componoent, { onRedirecting: () => <Loading /> })}
                {...args}
            /> */}
            <Homepage />
        </>
    );
}

export default LandingPage;
