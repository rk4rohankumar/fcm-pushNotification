const express = require('express');
const router = express.Router();
const dataController = require('../controllers/DataTable');
const { emitUpdatedData } = require('../services/socketService');
router.get('/data', dataController.getData);
router.get('/data/count', dataController.getDataCount);
router.post('/add-user', dataController.addUser, async (req, res) => {
    const io = req.app.get('io');  
    await emitUpdatedData(io);
    res.status(201).send('User added and broadcasted successfully');
});
module.exports = router;
