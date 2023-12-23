const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/', userController.createUser);
router.get('/:userId', userController.getUser);
router.get('/:userId/balance', userController.getBalance);
router.get('/:userId/exists', userController.userExists);
router.put('/:userId/balance', userController.updateBalance);
router.put('/exchange', userController.doExchange);

module.exports = router;