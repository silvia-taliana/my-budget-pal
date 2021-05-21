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

function App() {

  // if error, return error
  const { error } = useAuth0();
  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  // defining routes
  return (
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
  );
}

export default App;
