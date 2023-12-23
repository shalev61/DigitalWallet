const mongoose = require('mongoose');
const User = require('./models/User');

mongoose.set('strictQuery', false);

async function initDB() {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb://localhost:27017/DigitalWallet', { useNewUrlParser: true, useUnifiedTopology: true });

    // Create the initial user
    const initialUser = {
      userId: 2,
      balance: 20,
    };

    // Save the user to the database
    await User.create(initialUser);

    console.log('Database initialized with the initial user.');
  } catch (error) {
    console.error('Error initializing the database:', error);
  } finally {
    // Close the MongoDB connection
    mongoose.connection.close();
  }
}

async function updateBalance(userId, newBalance) {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb://localhost:27017/DigitalWallet', { useNewUrlParser: true, useUnifiedTopology: true });

    // Find the user with the given userId
    const user = await User.findOne({ userId });

    if (!user) {
      console.error(`User with userId ${userId} not found.`);
      return;
    }

    // Update the balance
    user.balance = newBalance;

    // Save the updated user to the database
    await user.save();

    console.log(`Balance updated for user with userId ${userId}. New balance: ${newBalance}`);
  } catch (error) {
    console.error('Error updating balance:', error);
  } finally {
    // Close the MongoDB connection
    mongoose.connection.close();
  }
}

// Execute functions sequentially
async function run() {
  await initDB();
  await updateBalance(1, 70);
}

// Call the run function
run();