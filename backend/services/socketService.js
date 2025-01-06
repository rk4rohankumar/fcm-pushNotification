const User = require('../models/Data');

const emitUpdatedData = async (io) => {
    const users = await User.find();
    io.emit('dataUpdate', users);  // Send data to all connected clients
};

// Send data when a client connects
const handleNewConnection = async (socket) => {
    const users = await User.find();
    socket.emit('dataUpdate', users);  // Send data to only the newly connected client
};

module.exports = { emitUpdatedData, handleNewConnection };
