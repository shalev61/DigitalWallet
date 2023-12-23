const axios = require('axios');

function sendNotification(userId, message) {
  console.log(`Sending notification to user ${userId}: ${message}`);
  const notificationServiceUrl = 'http://localhost:3002/notifications';
  axios.post(notificationServiceUrl, { userId, message })
    .then(response => {
      console.log('Notification sent successfully:', response.data);
    })
    .catch(error => {
      console.error('Error sending notification:', error.message);
    });
}

module.exports = {
  sendNotification,
};