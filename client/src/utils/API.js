import axios from "axios";

// Gets expenses by user id
function getExpensesById(user_id) {
    return axios.get(`/api/expenses/${user_id}`);
}

// Creates a new expense
function createExpense(expenseData) {
    return axios.post("/api/expenses", expenseData);
}

// Gets savings by user id
function getSavingsById(user_id) {
    return axios.get(`/api/savings/${user_id}`);
}

// Creates a new savings goal
function createSaving(savingData) {
    return axios.post("/api/savings", savingData);
}

const getBudgetData = { getExpensesById, createExpense, getSavingsById, createSaving };
export default getBudgetData;