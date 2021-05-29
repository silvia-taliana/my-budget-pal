import React from "react";
import { Route } from "react-router-dom";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import Homepage from "../Homepage/Homepage";
// import Loading from "../Loading/Loading";

const PrivateRoute = ({ component, ...args }) => (
    <Route
        component={withAuthenticationRequired(component, {
            onRedirecting: () => <Homepage />
        })}
        {...args}
    />
);

export default PrivateRoute;