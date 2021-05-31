import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
// import "./barchart.css";

function RenderBarchart(props) {
    //setting state for saving goals
    const [data, setData] = useState([
        { name: '', Goal: 0, Saved: 0 }
    ])

    // getting values for bar chart and saving into state
    useEffect(() => {
        //saving arrays into variables
        let goalId = Object.keys(props.goalAllocation);
        let savedAmount = Object.values(props.goalAllocation);
        let goalsArray = props.userGoals;

        // creating new array out of goalId and savedAmount
        let newArray = [];
        for (let i = 0; i < goalId.length; i++) {
            newArray.push({ id: goalId[i], saving: savedAmount[i] })
        }

        // creating final array and setting up structure ready for barchart
        let finalArray = [];
        for (let i = 0; i < newArray.length; i++) {
            finalArray.push({ name: goalsArray[i].goal, Goal: goalsArray[i].amount - newArray[i].saving, Saved: newArray[i].saving })
        }

        // saving final array into state
        setData(finalArray);
    }, [props.userGoals, props.goalAllocation]);

    // returning bar chart 
    return (
        <BarChart
            width={350}
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
            <Bar dataKey="Saved" stackId="a" fill="#8884d8" />
            <Bar dataKey="Goal" stackId="a" fill="#82ca9d" />
            {/* <Legend /> */}
        </BarChart>
    )
};

export default RenderBarchart;