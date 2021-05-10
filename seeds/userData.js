const { User } = require('../models');

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

const seedUser = () => User.bulkCreate(userData, {
    individualHooks: true
});

module.exports = seedUser;