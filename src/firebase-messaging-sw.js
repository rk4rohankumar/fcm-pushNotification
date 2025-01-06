importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

firebase.initializeApp({
    apiKey: "AIzaSyBqTQcsGDcSY2f9nIFWYSV3zPMW7XLc7jM",
    authDomain: "emoha-67fa4.firebaseapp.com",
    projectId: "emoha-67fa4",
    storageBucket: "emoha-67fa4.firebasestorage.app",
    messagingSenderId: "420475888808",
    appId: "1:420475888808:web:2650b148137a7a94b50e9d",
    measurementId: "G-Z5T2WB4QX3"
  });

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});


if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/firebase-messaging-sw.js')
      .then(function(registration) {
        console.log('Service Worker registered with scope:', registration.scope);
      }).catch(function(err) {
        console.log('Service Worker registration failed:', err);
      });
  }