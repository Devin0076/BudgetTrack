const {
  createTransaction,
  getTransactionsByUser,
  updateTransaction,
  deleteTransaction,
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


async function update(req, res) {
  try {
    const userId = req.userId;
    const transactionId = Number(req.params.id);
    const { amount, category, type, date, description } = req.body;

    if (!transactionId) {
      return res.status(400).json({ error: "Invalid transaction id" });
    }

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

    const updated = await updateTransaction(
      userId,
      transactionId,
      parsedAmount,
      category,
      type,
      date,
      description || null
    );

    if (!updated) {
      return res.status(404).json({ error: "Transaction not found" });
    }

    return res.json({ transaction: updated });
  } catch (err) {
    console.error("Update transaction error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function remove(req, res) {
  try {
    const userId = req.userId;
    const transactionId = Number(req.params.id);

    if (!transactionId) {
      return res.status(400).json({ error: "Invalid transaction id" });
    }

    const deleted = await deleteTransaction(userId, transactionId);

    if (!deleted) {
      return res.status(404).json({ error: "Transaction not found" });
    }

    return res.json({ deleted: true, id: deleted.id });
  } catch (err) {
    console.error("Delete transaction error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}


module.exports = { create, list, update, remove };