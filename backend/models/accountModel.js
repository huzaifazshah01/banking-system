const db = require("../config/db");

exports.getLastBalance = (userId, callback) => {
  const sql = `
    SELECT balance 
    FROM accounts 
    WHERE user_id = ? 
    ORDER BY created_at DESC 
    LIMIT 1
  `;
  db.query(sql, [userId], callback);
};

exports.createTransaction = (data, callback) => {
  const sql = `
    INSERT INTO accounts (user_id, type, amount, balance)
    VALUES (?, ?, ?, ?)
  `;
  db.query(
    sql,
    [data.user_id, data.type, data.amount, data.balance],
    callback
  );
};

exports.getTransactionsByUser = (userId, callback) => {
  const sql = `
    SELECT id, type, amount, balance, created_at
    FROM accounts
    WHERE user_id = ?
    ORDER BY created_at DESC
  `;
  db.query(sql, [userId], callback);
};
