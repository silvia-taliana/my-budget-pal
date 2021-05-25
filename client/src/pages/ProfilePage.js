import { useAuth0 } from '@auth0/auth0-react';
import API from "../utils/API"
import React, { useState, useEffect } from "react";

const payCycle = [
    {
        label: "Please select",
        value: "invalid",
    },
    {
        label: "Week",
        value: "Week",
    },
    {
        label: "Fortnight",
        value: "Fortnight",
    },
    {
        label: "Month",
        value: "Month",
    }
]

function Profile() {
    // setting state for income
    const [income, setIncome] = useState({});
    const [userincome, setUserIncome] = useState([]);

    // defining variable for user id
    let userId = "";

    // getting user information
    const { user, getAccessTokenSilently } = useAuth0();

    // handling form input 
    function handleInputChange(event) {
        const { name, value } = event.target;
        setIncome({ ...income, [name]: value })
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
    const addIncomeFormHandler = async (event) => {
        event.preventDefault();
        const checkAuth = await getAuth();
        try {
            if (!income.payCycle || income.payCycle === "invalid") {
                console.log("not allowed");
            } else if (checkAuth === "Authorized" && income.income && income.payCycle && income.totalSaving) {
                API.createIncome({
                    income: income.income,
                    payCycle: income.payCycle,
                    totalSaving: income.totalSaving,
                    user_id: userId,
                }).then(console.log("income added!"), clearForm())
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
        document.getElementById("incomeForm").reset();
    }

    // getting data from the api to display on screen specific to user only
    useEffect(() => {
        API.getIncomeById(user.sub)
            .then(res => {
                setUserIncome(res.data);
            })
            .catch(err => console.log(err));
    }, [user.sub, userincome]);


    // returning html
    return (
        <div>
            <h1>Profile Page</h1>

            <form id="incomeForm">
                <label>Income:</label>
                <input onChange={handleInputChange} name="income" placeholder="$"></input>
                <label>Per:</label>
                <select onChange={handleInputChange} name="payCycle">
                    {payCycle.map((option) => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>
                <label>Total weekly saving goal:</label>
                <input onChange={handleInputChange} name="totalSaving" placeholder="$"></input>
                <button onClick={addIncomeFormHandler}>Submit</button>
            </form>

            {userincome.map(income => {
                return <p key={income._id}>{JSON.stringify(income)}</p>
            })}
        </div>
    );
}

export default Profile;