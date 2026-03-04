const monthlyIncomeStrategy = require("./strategies/monthlyIncome.strategy");
const monthlyExpenseStrategy = require("./strategies/monthlyExpense.strategy");
const netBalanceStrategy = require("./strategies/netBalance.strategy");
const categoryBreakdownStrategy = require("./strategies/categoryBreakdown.strategy");

const strategies = {
  monthlyIncome: monthlyIncomeStrategy,
  monthlyExpense: monthlyExpenseStrategy,
  netBalance: netBalanceStrategy,
  categoryBreakdown: categoryBreakdownStrategy,
};

function runStrategy(name, data) {
  const strategy = strategies[name];
  if (!strategy) throw new Error(`Unknown analytics strategy: ${name}`);
  return strategy(data);
}

function buildMonthlySummary(transactions) {
  const income = runStrategy("monthlyIncome", transactions);
  const expense = runStrategy("monthlyExpense", transactions);
  const net = runStrategy("netBalance", { income, expense });
  const breakdown = runStrategy("categoryBreakdown", transactions);

  return {
    monthlyIncome: income,
    monthlyExpense: expense,
    netBalance: net,
    categoryBreakdown: breakdown,
  };
}

module.exports = { buildMonthlySummary, runStrategy };