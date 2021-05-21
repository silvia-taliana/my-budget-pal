import React from "react";
import Login from "../components/Login/Login";
import Homepage from "../components/Homepage/Homepage"
import { useAuth0 } from '@auth0/auth0-react';
import Loading from "../components/Loading/Loading";

function LandingPage() {

    // if page is loading, the loading component will be rendered, once loaded, the page will return
    const { isLoading, error, isAuthenticated } = useAuth0();
    // console.log(isLoading);
    if (error) {
        return <div>Oops... {error.message}</div>;
    }
    else if (isLoading) {
        return <Loading />;
    }

    // conditionally rendering components based on if the user is logged in/out
    if (isAuthenticated === false) {
        return (
            <>
                <Login />
                <h1>Welcome</h1>
                <p>This is what people will see if they are not logged in. Insert information here about the app to get people interested and to sign up :D</p>
            </>
        )
    }
    else {
        return (
            <Homepage />
        )
    }
}

export default LandingPage;
