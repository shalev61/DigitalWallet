const axios = require('axios');

async function userExists(userId) {
  try {
    const response = await axios.get(`http://localhost:3000/users/${userId}`);
    return response.status === 200;
  } catch (error) {
    console.error('Error checking if user exists:', error);
    throw new Error('Failed to check if user exists');
  }
}

async function getUserBalance(userId) {
  try {
    const response = await axios.get(`http://localhost:3000/users/${userId}/balance`);
    return response.data.balance;
  } catch (error) {
    console.error('Error fetching user balance:', error);
    throw new Error('Failed to fetch user balance');
  }
}


async function doTransaction(userId, receiverUserId, amount) {
    try {
      const response = await axios.put(`http://localhost:3000/users/exchange`, {
        senderUserId: userId,
        receiverUserId,
        amount,
      });
      
      if (response.status === 200) {
        return { success: true, message: 'Transaction finished successfully' };
      } else {
        return { success: false, error: 'Transaction failed' };
      }
    } catch (error) {
      console.error('Error performing transaction:', error);
      throw new Error('Failed to perform transaction');
    }
  }

module.exports = {
  userExists,
  getUserBalance,
  doTransaction,
};