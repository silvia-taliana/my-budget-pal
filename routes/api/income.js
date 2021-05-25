const router = require("express").Router();
const incomeController = require("../../controllers/incomeController");

// Matches with "/api/income"
router.route("/")
    .get(incomeController.findAll)
    .post(incomeController.create);

// Matches with "/api/income/:id"
router
    .route("/:id")
    .get(incomeController.find)
//     .put(incomeController.update)
//     .delete(incomeController.remove);

module.exports = router;
