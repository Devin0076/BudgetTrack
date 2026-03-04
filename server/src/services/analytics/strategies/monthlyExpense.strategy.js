function monthlyExpenseStrategy(transactions) {
  return transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + Number(t.amount), 0);
}

module.exports = monthlyExpenseStrategy;