import axios from "axios";

// export default {
//     // Gets all expenses
//     getExpenses: function () {
//         return axios.get("/api/expenses");
//     }
// };

// Gets all expenses
function getExpenses() {
    return axios.get("/api/expenses");
}

// Gets all savings
// function getSavings() {
//     return axios.get("/api/savings");
// }

const getBudgetData = { getExpenses };
export default getBudgetData;