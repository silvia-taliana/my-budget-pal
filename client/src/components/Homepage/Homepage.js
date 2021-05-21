import React, { useState, useEffect } from "react";
import API from "../../utils/API";
// import Expense from "../components/Expense/Expense";
// import Saving from "../Saving/Saving";
import { useAuth0 } from '@auth0/auth0-react';

function Homepage() {
    // logout function
    const { logout } = useAuth0();

    // user information
    const { user, isAuthenticated } = useAuth0();

    // setting state 
    const [expense, setExpenses] = useState([""]);
    const [items, setItems] = useState([]);
    const [saving, setSavings] = useState([""]);
    const [goals, setGoals] = useState([]);

    // functions to update state when buttons are clicked below
    useEffect(() => {
        API.getExpenses()
            .then(res => {
                setItems(res.data);
            })
            .catch(err => console.log(err));
    }, [expense]);

    useEffect(() => {
        API.getSavings()
            .then(res => {
                setGoals(res.data);
            })
            .catch(err => console.log(err));
    }, [saving]);

    // rendering html on to screen providing user is authenticated
    return (
        isAuthenticated && (
            <div>
                <h1>My Budget Pal</h1>
                <h2>Welcome {user.name}</h2>
                <button
                    onClick={() => logout()}>
                    Logout
            </button>

                <h2>Expenses List</h2>
                <button onClick={() => setExpenses("testing")}>Testing Expenses</button>

                <h3>{expense}</h3>
                {items.map(item => {
                    return <pre>{JSON.stringify(item)}</pre>
                })}

                <h2>Savings List</h2>
                <button onClick={() => setSavings("testing")}>Testing Savings</button>
                <h3>{saving}</h3>
                {goals.map(goal => {
                    return <pre>{JSON.stringify(goal)}</pre>
                })}

                {/* <Piechart /> */}
            </div>
        )
    );
}

export default Homepage;