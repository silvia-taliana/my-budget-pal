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

    const [userexpense, setUserExpenses] = useState([""]);
    const [useritems, setUserItems] = useState([]);

    // getting data from the api to display on screen
    useEffect(() => {
        API.getExpenses()
            .then(res => {
                setItems(res.data);
            })
            .catch(err => console.log(err));
    }, [expense]);

    useEffect(() => {
        API.getExpensesById(user.sub)
            .then(res => {
                setUserItems(res.data);
            })
            .catch(err => console.log(err));
    }, [userexpense]);

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
                <button onClick={() => setExpenses(items.map(item => {
                    return <pre key={item._id}>{JSON.stringify(item)}</pre>
                }))}>Testing Expenses</button>

                <h3>{expense}</h3>

                <h2>Expenses List by user</h2>
                <button onClick={() => setUserExpenses("testing")}>Testing User Expenses</button>

                <h3>{userexpense}</h3>
                {useritems.map(useritem => {
                    return <pre key={useritem._id}>{JSON.stringify(useritem)}</pre>
                })}

                <h2>Savings List</h2>
                <button onClick={() => setSavings(goals.map(goal => {
                    return <pre key={goal._id}>{JSON.stringify(goal)}</pre>
                }))}>Testing Savings</button>
                <h3>{saving}</h3>

                {/* <Piechart /> */}
            </div>
        )
    );
}

export default Homepage;