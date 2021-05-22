import React, { useState } from "react";
import { useAuth0 } from '@auth0/auth0-react';
import API from "../utils/API"

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

    // getting user information
    const { user } = useAuth0();

    // handling form input 
    function handleInputChange(event) {
        const { name, value } = event.target;
        setItems({ ...items, [name]: value })
    };

    // function to submit form on click
    const addExpenseFormHandler = async (event) => {
        event.preventDefault();
        if (!items.frequency || items.frequency === "invalid") {
            console.log("not allowed");
        } else if (items.type && items.amount && items.frequency) {
            API.createExpense({
                type: items.type,
                amount: items.amount,
                frequency: items.frequency,
                user_id: user.sub,
            }).then(console.log("expense added!"))
                .catch(err => console.log(err));
        }
        else {
            console.log("please enter data")
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