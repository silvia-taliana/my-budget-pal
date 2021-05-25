const router = require("express").Router();
const expensesRoutes = require("./expenses");
const savingsRoutes = require("./savings");
const incomeRoutes = require("./income");

// expenses and savings routes
router.use("/expenses", expensesRoutes);
router.use("/savings", savingsRoutes);
router.use("/income", incomeRoutes);

module.exports = router;