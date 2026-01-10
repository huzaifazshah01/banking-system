const Account = require("../models/accountModel");

exports.getTransactions = (req, res) => {
  const userId = req.user.id;

  Account.getTransactionsByUser(userId, (err, results) => {
    if (err) return res.status(500).json(err);

    const balance =
      results.length > 0 ? Number(results[0].balance) : 0;

    res.json({
      balance,
      transactions: results
    });
  });
};

exports.deposit = (req, res) => {
  const userId = req.user.id;
  const amount = Number(req.body.amount);

  if (!amount || amount <= 0) {
    return res.status(400).json({ message: "Invalid amount" });
  }

  Account.getLastBalance(userId, (err, rows) => {
    if (err) return res.status(500).json(err);

    const currentBalance =
      rows.length > 0 ? Number(rows[0].balance) : 0;

    const newBalance = currentBalance + amount;

    Account.createTransaction(
      {
        user_id: userId,
        type: "deposit",
        amount,
        balance: newBalance
      },
      (err) => {
        if (err) return res.status(500).json(err);

        res.json({
          message: "Deposit successful",
          balance: newBalance
        });
      }
    );
  });
};

exports.withdraw = (req, res) => {
  try {
    const userId = req.user.id;
    const amount = Number(req.body.amount);

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: "Invalid amount" });
    }

    Account.getLastBalance(userId, (err, rows) => {
      if (err) {
        console.error("DB ERROR:", err);
        return res.status(500).json({ message: "Database error" });
      }

      const currentBalance =
        rows && rows.length > 0 ? Number(rows[0].balance) : 0;

      if (amount > currentBalance) {
        return res.status(400).json({ message: "Insufficient Funds" });
      }

      const newBalance = currentBalance - amount;

      Account.createTransaction(
        {
          user_id: userId,
          type: "withdraw",
          amount,
          balance: newBalance
        },
        (err) => {
          if (err) {
            console.error("INSERT ERROR:", err);
            return res.status(500).json({ message: "Transaction failed" });
          }

          res.json({
            message: "Withdrawal successful",
            balance: newBalance
          });
        }
      );
    });
  } catch (e) {
    console.error("WITHDRAW CRASH:", e);
    res.status(500).json({ message: "Unexpected server error" });
  }
};