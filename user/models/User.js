const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
//   username: { type: String, required: true },
  userId: { type: Number, required: true },
  balance: { type: Number, default: 0 },
});

const User = mongoose.model('users', userSchema);

module.exports = User;