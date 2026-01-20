// const db = require("../config/db");

// exports.findByEmail = (email, callback) => {
//   const sql = `
//     SELECT id, name, email, password, role
//     FROM users
//     WHERE email = ?
//   `;
//   db.query(sql, [email], callback);
// };


// exports.findAllCustomers = (callback) => {
//   const sql = `
//     SELECT id, name, email
//     FROM users
//     WHERE role = 'customer'
//   `;
//   db.query(sql, callback);
// };

// exports.updateCustomer = (id, data, callback) => {
//   const sql = `
//     UPDATE users
//     SET name = ?, email = ?
//     WHERE id = ? AND role = 'customer'
//   `;
//   db.query(sql, [data.name, data.email, id], callback);
// };

const db = require("../config/db");

exports.findByEmail = async (email) => {
  const sql = `
    SELECT id, name, email, password, role
    FROM users
    WHERE email = $1
  `;
  const result = await db.query(sql, [email]);
  return result.rows;
};

exports.findAllCustomers = async () => {
  const sql = `
    SELECT id, name, email
    FROM users
    WHERE role = 'customer'
  `;
  const result = await db.query(sql);
  return result.rows;
};

exports.updateCustomer = async (id, data) => {
  const sql = `
    UPDATE users
    SET name = $1, email = $2
    WHERE id = $3 AND role = 'customer'
  `;
  await db.query(sql, [data.name, data.email, id]);
};
