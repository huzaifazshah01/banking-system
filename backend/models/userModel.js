const db = require("../config/db");

exports.findByEmail = (email, callback) => {
  const sql = `
    SELECT id, name, email, password, role
    FROM users
    WHERE email = ?
  `;
  db.query(sql, [email], callback);
};


exports.findAllCustomers = (callback) => {
  const sql = `
    SELECT id, name, email
    FROM users
    WHERE role = 'customer'
  `;
  db.query(sql, callback);
};

exports.updateCustomer = (id, data, callback) => {
  const sql = `
    UPDATE users
    SET name = ?, email = ?
    WHERE id = ? AND role = 'customer'
  `;
  db.query(sql, [data.name, data.email, id], callback);
};