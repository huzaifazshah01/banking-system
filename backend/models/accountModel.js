// const db = require("../config/db");

// exports.getLastBalance = (userId, callback) => {
//   const sql = `
//     SELECT balance 
//     FROM accounts 
//     WHERE user_id = ? 
//     ORDER BY created_at DESC 
//     LIMIT 1
//   `;
//   db.query(sql, [userId], callback);
// };

// exports.createTransaction = (data, callback) => {
//   const sql = `
//     INSERT INTO accounts (user_id, type, amount, balance)
//     VALUES (?, ?, ?, ?)
//   `;
//   db.query(
//     sql,
//     [data.user_id, data.type, data.amount, data.balance],
//     callback
//   );
// };

// exports.getTransactionsByUser = (userId, callback) => {
//   const sql = `
//     SELECT id, type, amount, balance, created_at
//     FROM accounts
//     WHERE user_id = ?
//     ORDER BY created_at DESC
//   `;
//   db.query(sql, [userId], callback);
// };
const db = require("../config/db");

exports.getLastBalance = async (userId) => {
  const sql = `
    SELECT balance
    FROM accounts
    WHERE user_id = $1
    ORDER BY created_at DESC
    LIMIT 1
  `;

  const result = await db.query(sql, [userId]);
  return result.rows;
};

exports.createTransaction = async (data) => {
  const sql = `
    INSERT INTO accounts (user_id, type, amount, balance)
    VALUES ($1, $2, $3, $4)
  `;

  await db.query(sql, [
    data.user_id,
    data.type,
    data.amount,
    data.balance
  ]);
};

exports.getTransactionsByUser = async (userId) => {
  const sql = `
    SELECT id, type, amount, balance, created_at
    FROM accounts
    WHERE user_id = $1
    ORDER BY created_at DESC
  `;

  const result = await db.query(sql, [userId]);
  return result.rows;
};
