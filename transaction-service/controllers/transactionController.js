const { validationResult } = require('express-validator');
const Transaction = require('../models/Transaction');  
const userService = require('../services/userService'); 
const notificationService = require('../services/notificationService');

async function createTransaction(req, res) {
  
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { senderUserId, receiverUserId, amount } = req.body;

  try {
    const [senderExists, receiverExists] = await Promise.all([
      userService.userExists(senderUserId),
      userService.userExists(receiverUserId),
    ]);

    if (!senderExists || !receiverExists) {
      return res.status(400).json({ error: 'Sender or receiver user does not exist' });
    }

    const senderBalance = await userService.getUserBalance(senderUserId);
    if (senderBalance < amount) {
      return res.status(400).json({ error: 'Insufficient funds' });
    }
    const newTransaction = new Transaction({
      senderUserId,
      receiverUserId,
      amount,
    });

    await userService.doTransaction(senderUserId, receiverUserId, amount);
    await newTransaction.save();

    notificationService.sendNotification(senderUserId, 'Transaction successful');
    notificationService.sendNotification(receiverUserId, 'Transaction received');

    res.status(200).json({ message: 'Transaction successful' });
  } catch (error) {
    console.error('Error processing transaction:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function getTransactionHistory(req, res) {
  try {
    const { userId } = req.params;

    const transactions = await Transaction.find({
      $or: [{ senderUserId: userId }, { receiverUserId: userId }],
    }).exec();

    const history = transactions.map((transaction) => {
      if (transaction.senderUserId === Number(userId)) {
        return `Sent ${transaction.amount}$ to User ${transaction.receiverUserId}`;
      } else {
        return `Received ${transaction.amount}$ from User ${transaction.senderUserId}`;
      }
    });

    console.log(`User ${userId}'s history is shown.`);

    res.status(200).json({ history });
  } catch (error) {
    console.error('Error fetching transaction history:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = {
  createTransaction,
  getTransactionHistory,
};