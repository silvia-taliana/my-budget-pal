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

const getBudgetData = { getExpenses, getExpensesById, createExpense, getSavings, getSavingsById };
export default getBudgetData;