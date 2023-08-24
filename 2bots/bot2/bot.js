const socketIoClient = require('socket.io-client');

const socket = socketIoClient('http://localhost:3000');

socket.on('connect', () => {
    console.log('Bot2: Connected to Bot1');

    // Send "hi" every 5 seconds
    setInterval(() => {
        socket.emit('message', 'hello');
    }, 5000);
});

socket.on('reply', (message) => {
    const currentTime = new Date().toLocaleTimeString();
    console.log(`${currentTime} - Bot2: Received reply "${message}" from Bot1`);
});
