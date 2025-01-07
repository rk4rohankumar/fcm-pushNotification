const express = require('express');
const mongoose = require('mongoose');
const dataRoutes = require('./routes/DataTable');
const cors = require('cors');
const { Server } = require('socket.io');
const http = require('http');
const { handleNewConnection } = require('./services/socketService');
const NotificationRoutes = require('./routes/notificationRoutes');
const Pusher = require('pusher');
const {initAdmin} = require('./secret/firbaseadmin');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
let totalusers = 0;
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

const pusher = new Pusher({
    appId: "1921209",
    key: "dd7ea6a63a7d0b49cda5",
    secret: "525594e6080bc70bdf19",
    cluster: "ap2",
    useTLS: true
  });
  
initAdmin();
  
mongoose.connect('mongodb+srv://rwpmns:Rohan%40k1@cluster0.oxtmylt.mongodb.net/dataTable');

// Store socket.io instance for routes usage
app.set('io', io);

// Socket Connection
io.on('connection', (socket) => {
    console.log('a new user connected,total connections:',++totalusers);
    handleNewConnection(socket);
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

app.use('/api', dataRoutes);
app.use('/api/notifications', NotificationRoutes);

app.post('/update-location', (req, res) => {
    const { userId, latitude, longitude } = req.body;
  
    pusher.trigger('location-channel', 'update', {
      userId,
      latitude,
      longitude,
    });
  
    res.status(200).send('Location updated');
  });

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
