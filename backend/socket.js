const socketIO = require('socket.io');
const userModel=require('./models/user.model');
const captainModel=require('./models/captain.models');

let io;

function initializeSocket(server) {
    
    io = socketIO(server, {
        cors: {
            origin:  "*",
            methods: ["GET", "POST"]
        }
    });
    io.on('connection', (socket) => {
        console.log('A user connected:', socket.id);

        socket.on('disconnect', () => {
            console.log('A user disconnected:', socket.id);
        });
    });
}

function sendMessageToSocketId(socketId, message) {
    if (io) {
        io.to(socketId).emit('message', message);
    } else {
        console.error('Socket.io is not initialized.');
    }
}

module.exports = {
    initializeSocket,
    sendMessageToSocketId
};