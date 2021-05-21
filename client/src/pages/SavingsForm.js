import React from "react";

function SavingsForm() {

    // returning html
    return (
        <div>
            <h1>Savings</h1>
            <form>
                <label>Saving Goal:</label>
                <input placeholder="e.g. Ski trip"></input>
                <label>Amount:</label>
                <input placeholder="$"></input>
                <label>Timeframe:</label>
                <input placeholder="0"></input><label>Week(s)</label>
                <input placeholder="0"></input><label>Month(s)</label>
                <input placeholder="0"></input><label>Year(s)</label>
                <button>Add Goal</button>
                <button>Finish</button>
            </form>
        </div>
    );
}

export default SavingsForm;