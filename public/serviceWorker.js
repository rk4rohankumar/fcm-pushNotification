// public/serviceWorker.js

self.addEventListener('push', (event) => {
  const data = event.data.json();
  const options = {
    body: data.message,
    icon: '/icon.png', // Path to your icon file
  };
  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});
