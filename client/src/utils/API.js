import axios from "axios";

// Gets all expenses
function getExpenses() {
    return axios.get("/api/expenses");
}

// Gets expenses by user id
function getExpensesById(user_id) {
    return axios.get(`/api/expenses/${user_id}`);
}

// Gets all savings
function getSavings() {
    return axios.get("/api/savings");
}

const getBudgetData = { getExpenses, getExpensesById, getSavings };
export default getBudgetData;