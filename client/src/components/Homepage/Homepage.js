import React, { useState, useEffect } from "react";
import API from "../../utils/API";
import Piechart from "../Piechart/Piechart";
import Barchart from "../Barchart/Barchart";
import { useAuth0 } from '@auth0/auth0-react';

function Homepage() {
    // logout function
    const { logout } = useAuth0();

    // user information
    const { user, isAuthenticated } = useAuth0();

    // setting state 
    const [useritems, setUserItems] = useState([]);
    const [usergoals, setUserGoals] = useState([]);
    const [totalExpenses, setTotalExpenses] = useState("");
    const [money, setMoney] = useState("");
    const [payCycle, setPayCycle] = useState("week");

    // getting data from the api to display on screen specific to user only
    useEffect(() => {
        API.getExpensesById(user.sub)
            .then(res => {
                setUserItems(res.data);
                let getWeeklyExpenses = res.data.map(expense => {
                    return expense.weeklyExpense;
                });
                let addExpenses = getWeeklyExpenses.reduce(getSum, 2);
                setTotalExpenses(addExpenses);
            })
            .catch(err => console.log(err));
    }, [user.sub]);

    // getting sum of all of the weekly expenses
    function getSum(total, num) {
        return total + Math.round(num);
    }

    // getting savings data 
    useEffect(() => {
        API.getSavingsById(user.sub)
            .then(res => {
                setUserGoals(res.data);
            })
            .catch(err => console.log(err));
    }, [user.sub]);

    // function to set money value showing total expenses
    useEffect(() => {
        setMoney(totalExpenses);
    }, [totalExpenses]);

    // function to toggle total expenses based on pay cycle to suit users needs
    function toggleExpenses() {
        if (payCycle === "week") {
            setPayCycle("fortnight");
            setMoney(totalExpenses * 2);
        }
        else if (payCycle === "fortnight") {
            setPayCycle("month");
            setMoney(totalExpenses * 4);
        }
        else {
            setPayCycle("week");
            setMoney(totalExpenses);
        }
    }

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

                <h2>Expenses</h2>
                <Piechart userExpenses={useritems} />
                <p>In order to save enough money to pay off all your expenses, put away ${money} each {payCycle} <button onClick={() => toggleExpenses()}>Toggle</button></p>

                <h2>Savings</h2>
                <Barchart userGoals={usergoals} />

            </div>
        )
    );
}

export default Homepage;