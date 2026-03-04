function netBalanceStrategy({ income, expense }) {
  return Number(income) - Number(expense);
}

module.exports = netBalanceStrategy;