import React from "react";

function ExpensesForm() {
    return (
        <div>
            <h1>Expenses</h1>
            <form>
                <label>Expense type:</label>
                <input placeholder="e.g. Elictricity bill"></input>
                <label>Amount:</label>
                <input placeholder="$"></input>
                <label>Frequency:</label>
                <select class="form-select" aria-label="Default select example">
                    <option selected>Please select</option>
                    <option value="Weekly">Weekly</option>
                    <option value="Fortnightly">Fortnightly</option>
                    <option value="Monthly">Monthly</option>
                    <option value="Quarterly">Quarterly</option>
                    <option value="Yearly">Yearly</option>
                    <option value="Other">Other</option>
                </select>
                <button>Add Expense</button>
                <button>Finish</button>
            </form>
        </div>
    );
}

export default ExpensesForm;