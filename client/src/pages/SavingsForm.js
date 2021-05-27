import React, { useState, useEffect } from "react";
import { useAuth0 } from '@auth0/auth0-react';
import API from "../utils/API"

function SavingsForm() {
    // setting state for saving goals
    const [goals, setGoals] = useState({
        week: 0, month: 0, year: 0
    });
    const [usergoals, setUserGoals] = useState([]);

    // defining variable for user id
    let userId = "";

    // getting user information
    const { user, getAccessTokenSilently } = useAuth0();

    // handling form input 
    function handleInputChange(event) {
        const { name, value } = event.target;
        setGoals({ ...goals, [name]: value })
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
    const addSavingFormHandler = async (event) => {
        event.preventDefault();
        const checkAuth = await getAuth();
        try {
            console.log(checkAuth);
            if (!goals.goal || !goals.amount) {
                console.log("Please enter data");
            } else if (checkAuth === "Authorized") {
                API.createSaving({
                    goal: goals.goal,
                    amount: goals.amount,
                    timeframe: {
                        week: goals.week,
                        month: goals.month,
                        year: goals.year,
                    },
                    user_id: userId,
                }).then(console.log("saving goal added!"), clearForm())
                    .catch(err => console.log(err));
            } else {
                console.log("You are not authorized")
            }
        } catch (err) {
            console.log(err);
        }
    }

    // function to clear form input 
    const clearForm = () => {
        document.getElementById("savingsForm").reset();
    }

    // function to calculate how much user needs to save each week to reach goal 
    const calcWeeklySave = (usergoal) => {
        let weeks = usergoal.timeframe.week;
        let months = usergoal.timeframe.month;
        let years = usergoal.timeframe.year;
        let totalWeeks = weeks + (months * 4) + (years * 52);
        let goalAmount = usergoal.amount / totalWeeks;
        return goalAmount.toFixed(2);
    }

    // function to delete saving by id
    function deleteSaving(id) {
        API.deleteSaving(id)
            .then(res => console.log("saving deleted"))
            .catch(err => console.log(err));
    }

    // getting data from the api to display on screen specific to user only
    useEffect(() => {
        API.getSavingsById(user.sub)
            .then(res => {
                setUserGoals(res.data);
            })
            .catch(err => console.log(err));
    }, [user.sub, setUserGoals]);

    // functions to conditionally return timeframe
    const checkWeek = (usergoal) => {
        let week = usergoal.timeframe.week;
        if (week === 0 || null || undefined) {
            return "";
        }
        else {
            return week + " week(s)";
        }
    }

    const checkMonth = (usergoal) => {
        let month = usergoal.timeframe.month;
        if (month === 0 || null || undefined) {
            return "";
        }
        else {
            return month + " month(s)";
        }
    }

    const checkYear = (usergoal) => {
        let year = usergoal.timeframe.year;
        if (year === 0 || null || undefined) {
            return "";
        }
        else {
            return year + " year(s)";
        }
    }

    // returning html
    return (
        <div>
            <h1>Savings</h1>
            <form id="savingsForm">
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
            </form>

            <h2>Savings List</h2>

            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Goal</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Timeframe</th>
                        <th scope="col">To kick this goal</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {usergoals.map(usergoal => {
                        return (
                            <tr key={usergoal._id} >
                                <th scope="row">{usergoal.goal} </th>
                                <td>${usergoal.amount}</td>
                                <td>{checkWeek(usergoal)} {checkMonth(usergoal)} {checkYear(usergoal)}</td>
                                <td>Save ${calcWeeklySave(usergoal)} each week!</td>
                                <td><button onClick={() => deleteSaving(usergoal._id)}>Delete</button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default SavingsForm;