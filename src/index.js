import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import App from './App';
import { store } from './store';
import * as serviceWorkerRegistration from './serviceWorkerRegistration.js';
import { urlBase64ToUint8Array } from './utils/vapidKeyUtils.js';

const root = ReactDOM.createRoot(document.getElementById('root'));

const publicVapidKey = 'BM635tBwjFBOflMI-YXR9G6mTPYdOoKPC5dSohP1p8vpWqx6Y2EdxASAUsaWXQTF8l8POHpLXSN9d-GjXuxNLTg'

root.render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
  </Provider>
  </React.StrictMode>
);

// serviceWorkerRegistration.register();

// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker.ready.then(async (registration) => {
//     try {
//       const applicationServerKey = urlBase64ToUint8Array(publicVapidKey);
//       const subscription = await registration.pushManager.subscribe({
//         userVisibleOnly: true,
//         applicationServerKey,
//       });
//       // Send subscription to your server
//       console.log('Push subscription:', subscription);
//     } catch (error) {
//       console.error('Failed to subscribe to push notifications:', error);
//     }
//   });
// }