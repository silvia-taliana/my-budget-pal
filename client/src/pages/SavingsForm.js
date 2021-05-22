import React, { useState } from "react";
import { useAuth0 } from '@auth0/auth0-react';
import API from "../utils/API"

function SavingsForm() {
    // setting state for saving goals
    const [goals, setGoals] = useState({});

    // getting user information
    const { user } = useAuth0();

    // handling form input 
    function handleInputChange(event) {
        const { name, value } = event.target;
        setGoals({ ...goals, [name]: value })
    };

    // function to submit form on click
    const addSavingFormHandler = async (event) => {
        event.preventDefault();
        console.log(goals.year);
        if (!goals.goal || !goals.amount) {
            console.log("not allowed");
        } else {
            API.createSaving({
                goal: goals.goal,
                amount: goals.amount,
                timeframe: {
                    week: goals.week,
                    month: goals.month,
                    year: goals.year,
                },
                user_id: user.sub,
            }).then(console.log("saving goal added!"))
                .catch(err => console.log(err));
        }
    }

    // returning html
    return (
        <div>
            <h1>Savings</h1>
            <form>
                <label>Saving Goal:</label>
                <input
                    onChange={handleInputChange}
                    name="goal"
                    placeholder="e.g. Ski trip"></input>
                <label>Amount:</label>
                <input
                    onChange={handleInputChange}
                    name="amount"
                    placeholder="$"></input>
                <label>Timeframe:</label>
                <input
                    onChange={handleInputChange}
                    name="week"
                    placeholder="0"></input><label>Week(s)</label>
                <input
                    onChange={handleInputChange}
                    name="month"
                    placeholder="0"></input><label>Month(s)</label>
                <input
                    onChange={handleInputChange}
                    name="year"
                    placeholder="0"></input><label>Year(s)</label>
                <button onClick={addSavingFormHandler}>Add Goal</button>
                <button>Finish</button>
            </form>
        </div>
    );
}

export default SavingsForm;