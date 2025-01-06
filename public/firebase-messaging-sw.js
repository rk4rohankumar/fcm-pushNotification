// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
// Replace 10.13.2 with latest version of the Firebase JS SDK.
importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
    apiKey: "AIzaSyBqTQcsGDcSY2f9nIFWYSV3zPMW7XLc7jM",
    authDomain: "emoha-67fa4.firebaseapp.com",
    projectId: "emoha-67fa4",
    storageBucket: "emoha-67fa4.firebasestorage.app",
    messagingSenderId: "420475888808",
    appId: "1:420475888808:web:2650b148137a7a94b50e9d",
    measurementId: "G-Z5T2WB4QX3"
  });

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log(
      '[firebase-messaging-sw.js] Received background message ',
      payload
    );
    // Customize notification here
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
      body: payload.notification.body,
      icon: payload.notification.icon|| payload.notification.image,
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
  