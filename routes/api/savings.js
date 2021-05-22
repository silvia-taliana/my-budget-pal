const router = require("express").Router();
const savingsController = require("../../controllers/savingsController");

// Matches with "/api/savings"
router.route("/")
    .get(savingsController.findAll)
// .post(savingsController.create);

// Matches with "/api/savings/:id"
router
    .route("/:id")
    .get(savingsController.find)
//     .put(savingsController.update)
//     .delete(savingsController.remove);

module.exports = router;
