// utils/webPush.js
const webPush = require('web-push');

const publicVapidKey = 'BCnuj1tsf--XOKB6kvCGcQ24OArIA996QUdXkA2Pps5yqIx4dXomK13QbNrY7ES3XvLwNvsa09L6hWCPWOMVxTs';
const privateVapidKey = 'F5iN-W_W3ksc-rjHBrGS2E2j33tF2ZxfYPDrn6b0t68';

webPush.setVapidDetails(
  'mailto:rohan.kumar@emoha.com',
  publicVapidKey,
  privateVapidKey
);

module.exports = webPush;
