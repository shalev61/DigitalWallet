const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
transactionRoutes = require('./routes/transactionRoutes');

const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = process.env.TRANSACTION_SERVICE_PORT   || 3001;

mongoose.connect('mongodb://localhost:27017/DigitalWallet', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.json());
app.use('/api', transactionRoutes);
app.listen(port, () => {
  console.log(`Transaction Service is listening on port ${port}`);
});