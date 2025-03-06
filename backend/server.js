const http = require('http');
const app = require('./app');
const { initializeSocket } = require('./socket');

const port = process.env.PORT || 3000;

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.IO with the server
initializeSocket(server);

// Handle server errors
server.on('error', (error) => {
    console.error('Server error:', error);
});

// Start the server
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    console.log(`WebSocket server is ready for connections`);
});