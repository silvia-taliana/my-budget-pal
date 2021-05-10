const { Savings } = require('../models');

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

const seedProduct = () => Savings.bulkCreate(savingData);

module.exports = seedProduct;