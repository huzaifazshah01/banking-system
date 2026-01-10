const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const controller = require("../controllers/transactionController");

router.get("/", auth, controller.getTransactions);
router.post("/deposit", auth, controller.deposit);
router.post("/withdraw", auth, controller.withdraw);

module.exports = router;
