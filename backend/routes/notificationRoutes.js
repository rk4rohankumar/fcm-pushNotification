// routes/notificationRoutes.js
const express = require('express');
const { subscribe, sendNotification } = require('../controllers/notificationController');

const router = express.Router();

router.post('/save-token', subscribe);
router.post('/send-notification', sendNotification);

module.exports = router;
