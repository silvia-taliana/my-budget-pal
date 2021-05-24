import { useAuth0 } from '@auth0/auth0-react';
import API from "../utils/API"
import React, { useState, useEffect } from "react";

// setting up array of options for categories
const catOptions = [
    {
        label: "Please select",
        value: "invalid",
    },
    {
        label: "Food",
        value: "food",
    },
    {
        label: "Bills",
        value: "bills",
    },
    {
        label: "Commute",
        value: "commute",
    },
    {
        label: "Other",
        value: "other",
    }
];

// setting up array of options for frequency
const freqOptions = [
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
    const [useritems, setUserItems] = useState([]);

    // defining variable for user id
    let userId = "";

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
            userId = response.user.sub;
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
            if (!items.frequency || items.frequency === "invalid" || !items.category || items.category === "invalid") {
                console.log("not allowed");
            } else if (checkAuth === "Authorized" && items.type && items.category && items.amount && items.frequency) {
                API.createExpense({
                    type: items.type,
                    category: items.category,
                    amount: items.amount,
                    frequency: items.frequency,
                    user_id: userId,
                }).then(console.log("expense added!"), clearForm())
                    .catch(err => console.log(err));
            }
            else {
                console.log("please enter data")
            }
        } catch (err) {
            console.log(err);
        }
    }

    // function to clear form input 
    const clearForm = () => {
        document.getElementById("expensesForm").reset();
    }

    // getting data from the api to display on screen specific to user only
    useEffect(() => {
        API.getExpensesById(user.sub)
            .then(res => {
                setUserItems(res.data);
            })
            .catch(err => console.log(err));
    }, [user.sub, useritems]);

    // returning html
    return (
        <div>
            <h1>Add Expenses</h1>
            <form id="expensesForm">
                <label>Expense type:</label>
                <input
                    onChange={handleInputChange}
                    name="type"
                    placeholder="e.g. Elictricity bill"></input>
                <label>Category:</label>
                <select name="category" value={items.category} onChange={handleInputChange}>
                    {catOptions.map((option) => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>
                <label>Amount:</label>
                <input
                    onChange={handleInputChange}
                    name="amount"
                    placeholder="$"></input>
                <label>Frequency:</label>
                <select name="frequency" value={items.frequency} onChange={handleInputChange}>
                    {freqOptions.map((option) => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>
                <button onClick={addExpenseFormHandler}>Add Expense</button>
            </form>

            <h2>Expenses List</h2>

            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Type</th>
                        <th scope="col">Category</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Frequency</th>
                    </tr>
                </thead>
                <tbody>
                    {useritems.map(useritem => {
                        return (
                            <tr key={useritem._id}>
                                <th scope="row">{useritem.type} </th>
                                <td>{useritem.category}</td>
                                <td>{useritem.amount}</td>
                                <td>{useritem.frequency}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default ExpensesForm;