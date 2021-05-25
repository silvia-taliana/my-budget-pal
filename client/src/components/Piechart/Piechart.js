// import React from "react";
import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Legend } from 'recharts';
import { useAuth0 } from '@auth0/auth0-react';
import API from "../../utils/API"

function RenderPiechart(props) {
    // setting state for income
    const [userincome, setUserIncome] = useState([]);
    const [data, setData] = useState([
        { name: 'Food', value: 0 },
        { name: 'Bills', value: 0 },
        { name: 'Commute', value: 0 },
        { name: 'Other', value: 0 },
        { name: 'Spending', value: 0 },
        { name: 'Saving', value: 0 }
    ])

    // getting user information
    const { user } = useAuth0();

    // function to render pie chart data
    const calculatePieChart = () => {
        let expenseMap = {
            food: 0,
            bills: 0,
            commute: 0,
            other: 0,
            spending: 0,
            saving: 0
        };

        let totalExpenses = 0;

        props.userExpenses.map(expense => {
            totalExpenses += expense.amount;
            return expenseMap[expense.category] += expense.amount;
        });

        expenseMap.spending = userincome - totalExpenses;

        const piechartData = Object.entries(expenseMap).map((value) => {
            return { name: value[0], value: value[1] }
        });

        setData(piechartData);
    }

    // getting income data
    useEffect(() => {
        API.getIncomeById(user.sub)
            .then(res => {
                setUserIncome(res.data[0].income);
                calculatePieChart();
            })
            .catch(err => console.log(err));
    }, [user.sub, props.userExpenses, calculatePieChart]);

    // setting up pie chart
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF4021'];

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="black" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    return (
        <PieChart width={400} height={400}>
            <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
            >
                {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
            </Pie>
            <Legend />
        </PieChart>
    )
}

export default RenderPiechart;