const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Books collection and inserts the books below

mongoose.connect(
    process.env.MONGODB_URI ||
    "mongodb://localhost/mybudgetpal"
);

const userData = [
    {
        name: 'Ronald',
        email: 'ronald@email.com',
        password: 'password123',
    },
    {
        name: 'Ginny',
        email: 'ginny@email.com',
        password: 'password123',
    },
    {
        name: 'George',
        email: 'george@email.com',
        password: 'password123',
    },
    {
        name: 'Fred',
        email: 'fred@email.com',
        password: 'password123',
    },
];

const expenseData = [
    {
        type: 'mortgage',
        amount: 300,
        frequency: "fortnightly",
        user_id: 1,
    },
    {
        type: 'electricity bill',
        amount: 400,
        frequency: "quaterly",
        user_id: 2,
    },
    {
        type: 'gas bill',
        amount: 120,
        frequency: "quaterly",
        user_id: 3,
    },
    {
        type: 'water bill',
        amount: 200,
        frequency: "quaterly",
        user_id: 4,
    },
];

const savingData = [
    {
        goal: 'holiday to Bali',
        amount: 2000,
        timeframe: 1,
        user_id: 1,
    },
    {
        goal: 'new car',
        amount: 5000,
        timeframe: 2,
        user_id: 2,
    },
    {
        goal: 'gucci bag',
        amount: 500,
        timeframe: 0.5,
        user_id: 3,
    },
    {
        goal: 'video game',
        amount: 50,
        timeframe: 0.1,
        user_id: 4,
    },
];

console.log(userData);
let MyBudgetPal = userData.concat(expenseData, savingData);
console.log(MyBudgetPal);

db.MyBudgetPal
    .remove({})
    .then(() => db.MyBudgetPal.collection.insertMany(MyBudgetPal))
    .then(data => {
        console.log(data.result.n + " records inserted!");
        process.exit(0);
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });