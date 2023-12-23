const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userId: { type: Number, unique: true, required: true },
  balance: { type: Number, default: 0 },
});

const User = mongoose.model('users', userSchema);

module.exports = User;