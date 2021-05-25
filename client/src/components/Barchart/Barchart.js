import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

function renderBarchart(props) {

    // setting up array for bar chart values
    let data = [];

    function addGoal() {
        let saved = 500;
        props.userGoals.map(goal => {
            data.push({ name: goal.goal, Goal: goal.amount - saved, Saved: saved });
            return data;
        })
    }

    addGoal();

    return (
        <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
            }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis dataKey="Goal" />
            <Tooltip />
            <Legend />
            <Bar dataKey="Saved" stackId="a" fill="#8884d8" />
            <Bar dataKey="Goal" stackId="a" fill="#82ca9d" />
        </BarChart>
    )
};

export default renderBarchart;