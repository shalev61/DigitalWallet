const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/DigitalWallet', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const userRoutes = require('./routes/userRoutes');
app.use('/users', userRoutes);
const PORT = process.env.USER_SERVICE_PORT  || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});