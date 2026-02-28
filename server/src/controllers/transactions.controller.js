const {
  createTransaction,
  getTransactionsByUser,
} = require("../models/transaction.model");

async function create(req, res) {
  try {
    const userId = req.userId;
    const { amount, category, type, date, description } = req.body;

    if (amount === undefined || !category || !type || !date) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const parsedAmount = Number(amount);
    if (Number.isNaN(parsedAmount)) {
      return res.status(400).json({ error: "Amount must be a number" });
    }

    if (type !== "income" && type !== "expense") {
      return res.status(400).json({ error: "Type must be income or expense" });
    }

    const tx = await createTransaction(
      userId,
      parsedAmount,
      category,
      type,
      date,
      description || null
    );

    return res.status(201).json({ transaction: tx });
  } catch (err) {
    console.error("Create transaction error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function list(req, res) {
  try {
    const userId = req.userId;
    const transactions = await getTransactionsByUser(userId);
    return res.json({ transactions });
  } catch (err) {
    console.error("List transactions error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = { create, list };