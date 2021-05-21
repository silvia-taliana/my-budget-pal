const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// setting up schema for savings/goals data
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