import React from "react";

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
    return (
        <div>
            <h1>Profile Page</h1>

            <form>
                <label>Income:</label>
                <input placeholder="$"></input>
                <label>Per:</label>
                <select name="payCycle">
                    {payCycle.map((option) => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>
                <label>Total weekly saving goal:</label>
                <input placeholder="$"></input>
            </form>
        </div>
    );
}

export default Profile;