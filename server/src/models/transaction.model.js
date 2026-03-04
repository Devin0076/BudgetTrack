const txRepo = require("../repositories/transaction.repository");

module.exports = {
  createTransaction: txRepo.createTransaction,
  getTransactionsByUser: txRepo.getTransactionsByUser,
  updateTransaction: txRepo.updateTransaction,
  deleteTransaction: txRepo.deleteTransaction,
};