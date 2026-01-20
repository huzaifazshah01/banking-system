// const User = require("../models/userModel");
// const Account = require("../models/accountModel");

// exports.getAllCustomers = (req, res) => {
//   console.log("BANKER USER:", req.user);

//   if (req.user.role !== "banker") {
//     return res.status(403).json({ message: "Access denied" });
//   }

//   User.findAllCustomers((err, results) => {
//     if (err) {
//       console.error("DB ERROR:", err);
//       return res.status(500).json(err);
//     }

//     console.log("CUSTOMERS FROM DB:", results);
//     res.json(results);
//   });
// };

//   exports.getCustomerTransactions = (req, res) => {
//   if (req.user.role !== "banker") {
//     return res.status(403).json({ message: "Access denied" });
//   }

//   const userId = Number(req.params.userId);

//   if (!userId) {
//     return res.status(400).json({ message: "Invalid user id" });
//   }

//   Account.getTransactionsByUser(userId, (err, results) => {
//     if (err) {
//       console.error("BANKER TRANSACTION ERROR:", err);
//       return res.status(500).json({ message: "Database error" });
//     }

//     res.json(results || []);
//   });
// };

// exports.updateCustomer = (req, res) => {
//   if (req.user.role !== "banker") {
//     return res.status(403).json({ message: "Access denied" });
//   }

//   const userId = Number(req.params.userId);
//   const { name, email } = req.body;

//   if (!name || !email) {
//     return res.status(400).json({ message: "Missing fields" });
//   }

//   User.updateCustomer(userId, { name, email }, (err) => {
//     if (err) {
//       console.error("UPDATE CUSTOMER ERROR:", err);
//       return res.status(500).json({ message: "Update failed" });
//     }

//     res.json({ message: "Customer updated successfully" });
//   });
// };
const User = require("../models/userModel");
const Account = require("../models/accountModel");

exports.getAllCustomers = async (req, res) => {
  if (req.user.role !== "banker") {
    return res.status(403).json({ message: "Access denied" });
  }

  try {
    const customers = await User.findAllCustomers();
    res.json(customers);
  } catch (err) {
    console.error("GET CUSTOMERS ERROR:", err);
    res.status(500).json({ message: "Database error" });
  }
};

exports.getCustomerTransactions = async (req, res) => {
  if (req.user.role !== "banker") {
    return res.status(403).json({ message: "Access denied" });
  }

  const userId = Number(req.params.userId);

  if (!userId) {
    return res.status(400).json({ message: "Invalid user id" });
  }

  try {
    const transactions = await Account.getTransactionsByUser(userId);
    res.json(transactions || []);
  } catch (err) {
    console.error("BANKER TRANSACTION ERROR:", err);
    res.status(500).json({ message: "Database error" });
  }
};

exports.updateCustomer = async (req, res) => {
  if (req.user.role !== "banker") {
    return res.status(403).json({ message: "Access denied" });
  }

  const userId = Number(req.params.userId);
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: "Missing fields" });
  }

  try {
    await User.updateCustomer(userId, { name, email });
    res.json({ message: "Customer updated successfully" });
  } catch (err) {
    console.error("UPDATE CUSTOMER ERROR:", err);
    res.status(500).json({ message: "Update failed" });
  }
};
