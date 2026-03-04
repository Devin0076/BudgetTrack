function categoryBreakdownStrategy(transactions) {
  const breakdown = {};

  for (const t of transactions) {
    const category = t.category || "Uncategorized";
    const amount = Number(t.amount);

    if (!breakdown[category]) breakdown[category] = 0;

    // expense subtracts, income adds 
    breakdown[category] += t.type === "expense" ? -amount : amount;
  }

  return breakdown;
}

module.exports = categoryBreakdownStrategy;