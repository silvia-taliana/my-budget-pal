import React from "react";
import ExpensesForm from "./pages/ExpensesForm";
import SavingsForm from "./pages/SavingsForm";
// import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav/Nav";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/expenses" component={ExpensesForm} />
          <Route exact path="/savings" component={SavingsForm} />
          {/* <Route path="*" component={NoMatch} /> */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
