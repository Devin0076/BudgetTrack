const pool = require("../db");

async function createTransaction(userId, amount, category, type, date, description) {
  const result = await pool.query(
    `INSERT INTO transactions (user_id, amount, category, type, date, description)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING id, user_id, amount, category, type, date, description`,
    [userId, amount, category, type, date, description]
  );

  return result.rows[0];
}

async function getTransactionsByUser(userId) {
  const result = await pool.query(
    `SELECT id, user_id, amount, category, type, date, description
     FROM transactions
     WHERE user_id = $1
     ORDER BY date DESC, id DESC`,
    [userId]
  );

  return result.rows;
}

async function updateTransaction(userId, transactionId, amount, category, type, date, description) {
  const result = await pool.query(
    `UPDATE transactions
     SET amount = $1, category = $2, type = $3, date = $4, description = $5
     WHERE id = $6 AND user_id = $7
     RETURNING id, user_id, amount, category, type, date, description`,
    [amount, category, type, date, description, transactionId, userId]
  );

  return result.rows[0];
}

async function deleteTransaction(userId, transactionId) {
  const result = await pool.query(
    `DELETE FROM transactions
     WHERE id = $1 AND user_id = $2
     RETURNING id`,
    [transactionId, userId]
  );

  return result.rows[0];
}

module.exports = {
  createTransaction,
  getTransactionsByUser,
  updateTransaction,
  deleteTransaction,
};