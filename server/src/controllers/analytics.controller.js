const { getTransactionsByUserAndMonth } = require("../models/transaction.model");
const { buildMonthlySummary } = require("../services/analytics/analytics.service");

async function monthlySummary(req, res) {
  const userId = req.userId;
  const { month } = req.query;

  if (!month || !/^\d{4}-\d{2}$/.test(month)) {
    return res.status(400).json({ error: "Query param 'month' must be YYYY-MM" });
  }

  const transactions = await getTransactionsByUserAndMonth(userId, month);
  const summary = buildMonthlySummary(transactions);

  return res.json({ month, summary });
}

module.exports = { monthlySummary };