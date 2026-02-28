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

module.exports = {
  createTransaction,
  getTransactionsByUser,
};