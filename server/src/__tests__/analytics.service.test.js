const { buildMonthlySummary, runStrategy } = require("../services/analytics/analytics.service");

describe("Analytics strategies", () => {
  const transactions = [
    { amount: 100, category: "Paycheck", type: "income" },
    { amount: 50, category: "Food", type: "expense" },
    { amount: 25, category: "Food", type: "expense" },
    { amount: 10, category: "Gifts", type: "income" },
  ];

  it("calculates monthly income correctly", () => {
    const income = runStrategy("monthlyIncome", transactions);
    expect(income).toBe(110);
  });

  it("calculates monthly expense correctly", () => {
    const expense = runStrategy("monthlyExpense", transactions);
    expect(expense).toBe(75);
  });

  it("calculates net balance correctly", () => {
    const summary = buildMonthlySummary(transactions);
    expect(summary.netBalance).toBe(35);
  });

  it("calculates category breakdown correctly", () => {
    const summary = buildMonthlySummary(transactions);

    // Food is expenses => negative
    expect(summary.categoryBreakdown.Food).toBe(-75);

    // Paycheck and Gifts are income => positive
    expect(summary.categoryBreakdown.Paycheck).toBe(100);
    expect(summary.categoryBreakdown.Gifts).toBe(10);
  });

  it("throws a helpful error for unknown strategy name", () => {
    expect(() => runStrategy("doesNotExist", transactions)).toThrow("Unknown analytics strategy");
  });
});