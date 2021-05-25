import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const data = [
    {
        name: 'New Bag',
        Goal: 200,
        Saved: 100,
    },
    {
        name: 'Holiday',
        Goal: 6000,
        Saved: 1000,
    },
    {
        name: 'Diamond Ring',
        Goal: 4000,
        Saved: 2400,
    },
    {
        name: 'Car',
        Goal: 7000,
        Saved: 2000,
    },
];

function renderBarchart() {
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