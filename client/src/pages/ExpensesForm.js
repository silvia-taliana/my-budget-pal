import { useAuth0 } from '@auth0/auth0-react';
import API from "../utils/API"
import React, { useState } from "react";

// setting up array of options for frequency
const options = [
    {
        label: "Please select",
        value: "invalid",
    },
    {
        label: "Weekly",
        value: "weekly",
    },
    {
        label: "Fortnightly",
        value: "fortnightly",
    },
    {
        label: "Monthly",
        value: "monthly",
    },
    {
        label: "Quaterly",
        value: "quaterly",
    },
    {
        label: "Yearly",
        value: "yearly",
    },
];

function ExpensesForm() {
    // setting state for expenses
    const [items, setItems] = useState({});
    const [userId, setUserId] = useState("");

    // getting user information
    const { user, getAccessTokenSilently } = useAuth0();

    // handling form input 
    function handleInputChange(event) {
        const { name, value } = event.target;
        setItems({ ...items, [name]: value })
    };

    // getting access token if user is logged in
    const getAuthToken = async () => {
        if (!user) {
            return null;
        }
        return getAccessTokenSilently({});
    };

    // authorizing access token and getting user id from token
    const getAuth = async () => {
        const token = await getAuthToken();
        try {
            const response = await fetch("/api/withAuth", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then((res) => res.json());
            setUserId(response.user.sub);
            return "Authorized";
        } catch (err) {
            console.log(err);
        }
    };

    // function to submit form on click only if user is authorized
    const addExpenseFormHandler = async (event) => {
        event.preventDefault();
        const checkAuth = await getAuth();
        try {
            if (!items.frequency || items.frequency === "invalid") {
                console.log("not allowed");
            } else if (checkAuth === "Authorized" && items.type && items.amount && items.frequency) {
                API.createExpense({
                    type: items.type,
                    amount: items.amount,
                    frequency: items.frequency,
                    user_id: userId,
                }).then(console.log("expense added!"))
                    .catch(err => console.log(err));
            }
            else {
                console.log("please enter data")
            }
        } catch (err) {
            console.log(err);
        }
    }

    // returning html
    return (
        <div>
            <h1>Expenses</h1>
            <form>
                <label>Expense type:</label>
                <input
                    onChange={handleInputChange}
                    name="type"
                    placeholder="e.g. Elictricity bill"></input>
                <label>Amount:</label>
                <input
                    onChange={handleInputChange}
                    name="amount"
                    placeholder="$"></input>
                <label>Frequency:</label>
                <select name="frequency" value={items.frequency} onChange={handleInputChange}>
                    {options.map((option) => (
                        <option value={option.value}>{option.label}</option>
                    ))}
                </select>
                <button onClick={addExpenseFormHandler}>Add Expense</button>
                <button>Finish</button>
            </form>
        </div>
    );
}

export default ExpensesForm;