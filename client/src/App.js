import React from "react";
import ExpensesForm from "./pages/ExpensesForm";
import SavingsForm from "./pages/SavingsForm";
// import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav/Nav";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import PrivateRoute from "./components/PrivateRoutes/PrivateRoute";
import TestPage from "./components/Test/TestPage";
import { useAuth0 } from "@auth0/auth0-react";
import { Auth0Provider } from '@auth0/auth0-react';

function App() {

  const { error } = useAuth0();
  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  console.log({
    domain: process.env.REACT_APP_AUTH0_DOMAIN,
    client: process.env.REACT_APP_AUTH0_CLIENT_ID,
    audience: process.env.REACT_APP_AUTH0_AUDIENCE,
  })

  return (
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH0_DOMAIN}
      clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
      redirectUri={window.location.origin}
      audience={process.env.REACT_APP_AUTH0_AUDIENCE}
      scope="all">
      <Router>
        <div>
          <Nav />
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <PrivateRoute exact path="/testpage" component={TestPage} />
            <Route exact path="/expenses" component={ExpensesForm} />
            <Route exact path="/savings" component={SavingsForm} />
            {/* <Route path="*" component={NoMatch} /> */}
          </Switch>
        </div>
      </Router>
    </Auth0Provider>
  );
}

export default App;
