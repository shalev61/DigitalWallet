const express = require('express');
const { check, validationResult } = require('express-validator');
const transactionController = require('../controllers/transactionController');

const router = express.Router();

router.post(
  '/transactions',
  [
    check('senderUserId').isInt().notEmpty(),
    check('receiverUserId').isInt().notEmpty(),
    check('amount').isFloat({ gt: 0 }).notEmpty(),
  ],
  transactionController.createTransaction
);

router.get('/history/:userId', transactionController.getTransactionHistory);

module.exports = router;