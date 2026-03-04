function monthlyIncomeStrategy(transactions) {
  return transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + Number(t.amount), 0);
}

module.exports = monthlyIncomeStrategy;