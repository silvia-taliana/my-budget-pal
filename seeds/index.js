const mongoose = require("mongoose");
const db = require("../models");

// This file empties the expenses/savings collections and inserts the expenses/savings below
mongoose.connect(
    process.env.MONGODB_URI ||
    "mongodb://localhost/mybudgetpal"
);

const expenseData = [
    {
        type: 'mortgage',
        amount: 300,
        frequency: "fortnightly",
        user_id: "google-oauth2|105678671351572796457",
    },
    {
        type: 'electricity bill',
        amount: 400,
        frequency: "quaterly",
        user_id: "google-oauth2|105678671351572796457",
    },
    {
        type: 'gas bill',
        amount: 120,
        frequency: "quaterly",
        user_id: "",
    },
    {
        type: 'water bill',
        amount: 200,
        frequency: "quaterly",
        user_id: "",
    },
];

const savingData = [
    {
        goal: 'holiday to Bali',
        amount: 2000,
        timeframe: {
            week: 0,
            month: 3,
            year: 1,
        },
    },
    {
        goal: 'new car',
        amount: 5000,
        timeframe: {
            week: 0,
            month: 0,
            year: 2,
        },
    },
    {
        goal: 'gucci bag',
        amount: 500,
        timeframe: {
            week: 0,
            month: 4,
            year: 0,
        },
    },
    {
        goal: 'video game',
        amount: 50,
        timeframe: {
            week: 2,
            month: 0,
            year: 0,
        },
    },
];

db.Expense
    .remove({})
    .then(() => db.Expense.collection.insertMany(expenseData))
    .then(data => {
        console.log(data.result.n + " expense records inserted!");
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });

db.Saving
    .remove({})
    .then(() => db.Saving.collection.insertMany(savingData))
    .then(data => {
        console.log(data.result.n + " saving records inserted!");
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });