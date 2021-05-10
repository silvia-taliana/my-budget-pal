const sequelize = require('../config/connection');
const seedUser = require('./userData');
const seedExpenses = require('./expensesData');
const seedSavings = require('./savingsData');

const seedAll = async () => {
    await sequelize.sync({ force: true });

    await seedUser();

    await seedExpenses();

    await seedSavings();

    process.exit(0);
};

seedAll();