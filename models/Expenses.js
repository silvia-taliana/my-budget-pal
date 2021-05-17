
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const expensesSchema = new Schema({
    type: { type: String, required: true },
    amount: { type: Number, required: true },
    frequency: String,
});

const Expense = mongoose.model("Expense", expensesSchema);

module.exports = Expense;

// const { Model, DataTypes } = require('sequelize');
// const sequelize = require('../config/connection');

// class Expenses extends Model { }

// Expenses.init(
//     {
//         expenses_id: {
//             type: DataTypes.INTEGER,
//             allowNull: false,
//             primaryKey: true,
//             autoIncrement: true,
//         },
//         type: {
//             type: DataTypes.STRING,
//             allowNull: false,
//         },
//         amount: {
//             type: DataTypes.INTEGER,
//             allowNull: false,
//         },
//         frequency: {
//             type: DataTypes.STRING,
//             allowNull: false,
//         },
//         user_id: {
//             type: DataTypes.INTEGER,
//             allowNull: false,
//             references: {
//                 model: 'user',
//                 key: 'user_id',
//             },
//         },
//     },
//     {
//         sequelize,
//         timestamps: false,
//         freezeTableName: true,
//         underscored: true,
//         modelName: 'expenses',
//     }
// );

// module.exports = Expenses;