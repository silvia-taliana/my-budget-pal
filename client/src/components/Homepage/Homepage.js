import React, { useState, useEffect } from "react";
import API from "../../utils/API";
import Piechart from "../Piechart/Piechart";
// import Expense from "../components/Expense/Expense";
// import Saving from "../Saving/Saving";
import { useAuth0 } from '@auth0/auth0-react';

function Homepage() {
    // logout function
    const { logout } = useAuth0();

    // user information
    const { user, isAuthenticated } = useAuth0();

    // setting state 
    const [useritems, setUserItems] = useState([]);
    const [usergoals, setUserGoals] = useState([]);

    // getting data from the api to display on screen specific to user only
    useEffect(() => {
        API.getExpensesById(user.sub)
            .then(res => {
                setUserItems(res.data);
            })
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        API.getSavingsById(user.sub)
            .then(res => {
                setUserGoals(res.data);
            })
            .catch(err => console.log(err));
    }, []);

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

                <h2>Expenses List by user</h2>
                <Piechart />

                {useritems.map(useritem => {
                    return <pre key={useritem._id}>{JSON.stringify(useritem)}</pre>
                })}

                <h2>Savings List</h2>
                {usergoals.map(usergoal => {
                    return <pre key={usergoal._id}>{JSON.stringify(usergoal)}</pre>
                })}

            </div>
        )
    );
}

export default Homepage;