import axios from "axios";

// Gets all expenses
function getExpenses() {
    return axios.get("/api/expenses");
}

// Gets expenses by user id
function getExpensesById(user_id) {
    return axios.get(`/api/expenses/${user_id}`);
}

// Creates a new expense
function createExpense(expenseData) {
    return axios.post("/api/expenses", expenseData);
}

// Gets all savings
function getSavings() {
    return axios.get("/api/savings");
}

// Gets savings by user id
function getSavingsById(user_id) {
    return axios.get(`/api/savings/${user_id}`);
}

// Creates a new savings goal
function createSaving(savingData) {
    return axios.post("/api/savings", savingData);
}

const getBudgetData = { getExpenses, getExpensesById, createExpense, getSavings, getSavingsById, createSaving };
export default getBudgetData;