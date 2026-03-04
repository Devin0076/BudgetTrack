const txRepo = require("../repositories/transaction.repository");

module.exports = {
  createTransaction: txRepo.createTransaction,
  getTransactionsByUser: txRepo.getTransactionsByUser,
  getTransactionsByUserAndMonth: txRepo.getTransactionsByUserAndMonth,
  updateTransaction: txRepo.updateTransaction,
  deleteTransaction: txRepo.deleteTransaction,
};