import React from "react";
import Login from "./pages/Login";
import Homepage from "./pages/Homepage";
import ExpensesForm from "./pages/ExpensesForm";
import SavingsForm from "./pages/SavingsForm";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav/Nav";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/home" component={Homepage} />
          <Route exact path="/expensesForm" component={ExpensesForm} />
          <Route exact path="/savingsForm" component={SavingsForm} />
          <Route path="*" component={NoMatch} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
