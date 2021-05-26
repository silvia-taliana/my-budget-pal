import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

function RenderBarchart(props) {
    //setting state for saving goals
    const [data, setData] = useState([
        { name: '', Goal: 0, Saved: 0 }
    ])

    // getting values for bar chart and saving into state
    useEffect(() => {
        let saved = 500;
        let newGoal = props.userGoals.map(goal => {
            return { name: goal.goal, Goal: goal.amount - saved, Saved: saved };
        })
        setData(newGoal);
    }, [props.userGoals]);

    // returning bar chart 
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

export default RenderBarchart;