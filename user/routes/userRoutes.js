const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Routes
router.post('/', userController.createUser);
router.get('/:userId', userController.getUser);
router.put('/:userId/balance', userController.updateBalance);

module.exports = router;