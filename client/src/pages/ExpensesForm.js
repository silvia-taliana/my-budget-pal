import React from "react";

function ExpensesForm() {

    const addExpenseFormHandler = async (event) => {
        event.preventDefault();
        console.log(event);
    }

    return (
        <div>
            <h1>Expenses</h1>
            <form>
                <label>Expense type:</label>
                <input placeholder="e.g. Elictricity bill"></input>
                <label>Amount:</label>
                <input placeholder="$"></input>
                <label>Frequency:</label>
                <select className="form-select" aria-label="Default select example">
                    <option defaultValue>Please select</option>
                    <option value="Weekly">Weekly</option>
                    <option value="Fortnightly">Fortnightly</option>
                    <option value="Monthly">Monthly</option>
                    <option value="Quarterly">Quarterly</option>
                    <option value="Yearly">Yearly</option>
                    {/* <option value="Other">Other</option> */}
                </select>
                <button onClick={addExpenseFormHandler}>Add Expense</button>
                <button>Finish</button>
            </form>
        </div>
    );
}

export default ExpensesForm;