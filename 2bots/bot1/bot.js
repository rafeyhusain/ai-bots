const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', (socket) => {
  console.log('Bot1: Client connected');

  socket.on('message', (message) => {
    const currentTime = new Date().toLocaleTimeString();
    console.log(`${currentTime} - Bot1: Received message "${message}" from Bot2`);
    socket.emit('reply', 'hi');
  });
});

server.listen(3000, () => {
  console.log('Bot1 app listening on port 3000');
});
