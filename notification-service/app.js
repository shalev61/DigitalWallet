const express = require('express');
const bodyParser = require('body-parser');

const dotenv = require('dotenv');
dotenv.config();

const app = express();
const PORT = process.env.NOTIFICATION_SERVICE_PORT || 3002;

app.use(bodyParser.json());

// "my implementation"
function sendNotification(userId, message) {
  console.log(`Sending notification to user ${userId}: ${message}`);
}

app.post('/notifications', (req, res) => {
  const { userId, message } = req.body;
  
  // 
  //
  //
  //  Call the sendNotification() method    
  //  "assume the method sendNotification() has already been implemented."
  //
  //
  //

  sendNotification(userId, message);

  res.json({ message: 'Notification sent successfully' });
});

app.listen(PORT, () => {
  console.log(`Notification Service is running on port ${PORT}`);
});