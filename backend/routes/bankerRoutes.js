const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const bankerController = require("../controllers/bankerController");

router.get('/customers',auth,bankerController.getAllCustomers);
router.get('/transactions/:userId',auth,bankerController.getCustomerTransactions);

module.exports = router;
