import React from "react";
import { PieChart, Pie, Cell, Legend } from 'recharts';

function renderPiechart(props) {

    let chartArray = [
        { name: 'Food', value: 0 },
        { name: 'Bills', value: 0 },
        { name: 'Commute', value: 0 },
        { name: 'Other', value: 0 },
        { name: 'Spending', value: 0 },
        { name: 'Saving', value: 0 }
    ];

    function getData() {
        props.userExpenses.map(expense => {
            if (expense.category === "food") {
                let objInd = chartArray.findIndex((obj => obj.name === "Food"));
                console.log("before update: ", chartArray[objInd]);
                chartArray[objInd].value = addValues(chartArray[objInd].value, expense.amount);
                console.log("after update: ", chartArray[objInd]);
                return chartArray;
            }
            console.log(chartArray);
            return chartArray;
        })
    }

    function addValues(a, b) {
        return a + b;
    }

    getData();

    const data = [
        { name: 'Food', value: 300 },
        { name: 'Bills', value: 500 },
        { name: 'Commute', value: 100 },
        { name: 'Other', value: 100 },
        { name: 'Spending', value: 400 },
        { name: 'Saving', value: 200 },
    ];

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

export default renderPiechart;