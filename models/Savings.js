const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const savingsSchema = new Schema({
    goal: { type: String, required: true },
    amount: { type: Number, required: true },
    timeframe: {
        week: Number,
        month: Number,
        Year: Number,
    },
});

const Saving = mongoose.model("Saving", savingsSchema);

module.exports = Saving;

// const { Model, DataTypes } = require('sequelize');
// const sequelize = require('../config/connection');

// class Savings extends Model { }

// Savings.init(
//     {
//         savings_id: {
//             type: DataTypes.INTEGER,
//             allowNull: false,
//             primaryKey: true,
//             autoIncrement: true,
//         },
//         goal: {
//             type: DataTypes.STRING,
//             allowNull: false,
//         },
//         amount: {
//             type: DataTypes.INTEGER,
//             allowNull: false,
//         },
//         timeframe: {
//             type: DataTypes.INTEGER,
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
//         modelName: 'savings',
//     }
// );

// module.exports = Savings;