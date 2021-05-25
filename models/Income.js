const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// setting up schema for Income data 
const incomeSchema = new Schema({
    income: { type: Number, required: true },
    payCycle: { type: String, required: true },
    totalSaving: { type: Number, required: true },
    user_id: String,
});

const Income = mongoose.model("Income", incomeSchema);

module.exports = Income;