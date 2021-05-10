const { Expenses } = require('../models');

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

const seedProduct = () => Expenses.bulkCreate(expenseData);

module.exports = seedProduct;