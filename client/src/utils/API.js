import axios from "axios";

// Gets all expenses
function getExpenses() {
    return axios.get("/api/expenses");
}

// Gets all savings
function getSavings() {
    return axios.get("/api/savings");
}

const getBudgetData = { getExpenses, getSavings };
export default getBudgetData;