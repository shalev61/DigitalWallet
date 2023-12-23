const User = require('../models/User');

const createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ error: 'this userId is already in use' });
    } else {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findOne({ "userId": Number(req.params.userId) });
    if (!user) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.json(user);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const userExists = async (req, res) => {
    try {
      const user = await User.findOne({ "userId": Number(req.params.userId) });
      res.json({ exists: !!user });
    } catch (error) {
      console.error('Error checking if user exists:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  const getBalance = async (req, res) => {
    try {
      const user = await User.findOne({ "userId": Number(req.params.userId) });
      if (!user) {
        res.status(404).json({ error: 'User not found' });
      } else {
        res.json(user.balance);
      }
    } catch (error) {
      console.error('Error fetching balance:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  

const updateBalance = async (req, res) => {
  try {
    const { userId } = req.params;
    const { balance } = req.body;

    const user = await User.findOne({ "userId": Number(userId) });
    if (!user) {
      res.status(404).json({ error: 'User not found' });
    } else {
      user.balance = balance;
      await user.save();
      res.json({ message: 'Balance updated successfully' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const doExchange = async (req, res) => {
  try {
    const { senderUserId,  receiverUserId, amount} = req.body;

    const userSend = await User.findOne({ "userId": Number(senderUserId) });
    const userReceive = await User.findOne({ "userId": Number(receiverUserId) });
    if ( (!userSend) || (!userReceive) ) {
      res.status(404).json({ error: 'At least one User not found' });
    } else {
      userSend.balance = Number(userSend.balance) - Number(amount);
      userReceive.balance = Number(userReceive.balance) + Number(amount);
      await userSend.save();
      await userReceive.save();
      res.json({ message: 'Transaction finished successfully' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { createUser, getUser, updateBalance, getBalance, userExists, doExchange};