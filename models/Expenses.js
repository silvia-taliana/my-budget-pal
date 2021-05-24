const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// setting up schema for expenses data 
const expensesSchema = new Schema({
    type: { type: String, required: true },
    category: { type: String, required: true },
    amount: { type: Number, required: true },
    frequency: { type: String, required: true },
    user_id: String,
});

const Expense = mongoose.model("Expense", expensesSchema);

module.exports = Expense;