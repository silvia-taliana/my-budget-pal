import React from "react";
import { PieChart, Pie, Cell, Legend } from 'recharts';

function renderPiechart(props) {

    // setting up array for pie chart values (TEMPORARY NUMBERS!!)
    let data = [
        { name: 'Food', value: 100 },
        { name: 'Bills', value: 100 },
        { name: 'Commute', value: 100 },
        { name: 'Other', value: 100 },
        { name: 'Spending', value: 100 },
        { name: 'Saving', value: 100 }
    ];

    // getting amount value for each expense and updating associated category in pie chart data
    function getData() {
        props.userExpenses.map(expense => {
            if (expense.category === "food") {
                let objInd = data.findIndex((obj => obj.name === "Food"));
                data[objInd].value = addValues(data[objInd].value, expense.amount);
                return data;
            }
            else if (expense.category === "bills") {
                let objInd = data.findIndex((obj => obj.name === "Bills"));
                data[objInd].value = addValues(data[objInd].value, expense.amount);
                return data;
            }
            else if (expense.category === "commute") {
                let objInd = data.findIndex((obj => obj.name === "Commute"));
                data[objInd].value = addValues(data[objInd].value, expense.amount);
                return data;
            }
            else if (expense.category === "other") {
                let objInd = data.findIndex((obj => obj.name === "Other"));
                data[objInd].value = addValues(data[objInd].value, expense.amount);
                return data;
            }
            else {
                return data;
            }
        })
    }

    // function to add values
    function addValues(a, b) {
        return a + b;
    }

    // starting function when page loads
    getData();

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

export default renderPiechart;