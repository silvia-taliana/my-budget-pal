const router = require("express").Router();
const expensesRoutes = require("./expenses");
const savingsRoutes = require("./savings");

// expenses and savings routes
router.use("/expenses", expensesRoutes);
router.use("/savings", savingsRoutes);

module.exports = router;