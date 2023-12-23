const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  senderUserId: { type: Number, required: true },
  receiverUserId: { type: Number, required: true },
  amount: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
});

const Transaction = mongoose.model('transactions', transactionSchema);

module.exports = Transaction;