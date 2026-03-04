const AppError = require("../errors/AppError");
const {
  createTransaction,
  getTransactionsByUser,
  updateTransaction,
  deleteTransaction,
} = require("../models/transaction.model");

async function create(req, res, next) {
  try {
    const userId = req.userId;
    const { amount, category, type, date, description } = req.body;

    if (amount === undefined || !category || !type || !date) {
      return next(new AppError("Missing required fields", 400));
    }

    const parsedAmount = Number(amount);
    if (Number.isNaN(parsedAmount)) {
      return next(new AppError("Amount must be a number", 400));
    }

    if (type !== "income" && type !== "expense") {
      return next(new AppError("Type must be income or expense", 400));
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
    return next(new AppError("Internal server error", 500));
  }
}

async function list(req, res, next) {
  try {
    const userId = req.userId;
    const transactions = await getTransactionsByUser(userId);
    return res.json({ transactions });
  } catch (err) {
    console.error("List transactions error:", err);
    return next(new AppError("Internal server error", 500));
  }
}

async function update(req, res, next) {
  try {
    const userId = req.userId;
    const transactionId = Number(req.params.id);
    const { amount, category, type, date, description } = req.body;

    if (!transactionId) {
      return next(new AppError("Invalid transaction id", 400));
    }

    if (amount === undefined || !category || !type || !date) {
      return next(new AppError("Missing required fields", 400));
    }

    const parsedAmount = Number(amount);
    if (Number.isNaN(parsedAmount)) {
      return next(new AppError("Amount must be a number", 400));
    }

    if (type !== "income" && type !== "expense") {
      return next(new AppError("Type must be income or expense", 400));
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
      return next(new AppError("Transaction not found", 404));
    }

    return res.json({ transaction: updated });
  } catch (err) {
    console.error("Update transaction error:", err);
    return next(new AppError("Internal server error", 500));
  }
}

async function remove(req, res, next) {
  try {
    const userId = req.userId;
    const transactionId = Number(req.params.id);

    if (!transactionId) {
      return next(new AppError("Invalid transaction id", 400));
    }

    const deleted = await deleteTransaction(userId, transactionId);

    if (!deleted) {
      return next(new AppError("Transaction not found", 404));
    }

    return res.json({ deleted: true, id: deleted.id });
  } catch (err) {
    console.error("Delete transaction error:", err);
    return next(new AppError("Internal server error", 500));
  }
}

module.exports = { create, list, update, remove };