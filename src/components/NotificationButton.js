// components/NotificationButton.js
import React from 'react';
import request from '../utils/request';

const NotificationButton = () => {
  const sendNotification = async () => {
    await request.post('/send-notification', {
      title: 'Hello!',
      message: 'This is a test notification.',
    });
  };

  return (
    <button onClick={sendNotification}>
      Send Notification
    </button>
  );
};

export default NotificationButton;
