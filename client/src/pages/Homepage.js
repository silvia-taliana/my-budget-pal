import React, { useState, useEffect } from "react";
import API from "../utils/API";
// import Expense from "../components/Expense/Expense";
import Saving from "../components/Saving/Saving";

function Homepage() {

    const [expense, setExpenses] = useState([""]);
    const [items, setItems] = useState([])

    useEffect(() => {
        API.getExpenses()
            .then(res => {
                setItems(res.data)
            })
            .catch(err => console.log(err));
    }, [expense]);

    // function loadExpenses() {
    //     API.getExpenses()
    //         .then(res =>
    //             setExpenses(res.data)
    //         )
    //         .catch(err => console.log(err));
    // };

    return (
        <div>
            <h1>My Budget Pal</h1>

            <h2>Expenses List</h2>
            <button onClick={() => setExpenses("testing")}>Testing</button>

            <h3>{expense}</h3>
            {items.map(item => {
                return <pre>{JSON.stringify(item)}</pre>
            })}

            <h2>Savings List</h2>
            <Saving />
        </div>
    );
}

export default Homepage;