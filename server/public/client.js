// client.js
const WebSocket = require('ws');

// Connect to the WebSocket server
const ws = new WebSocket('ws://localhost:3000');

// Event handler for when the connection is established
ws.on('open', function open() {
  console.log('Connected to server');
  
  // Send a message to the server
  ws.send(JSON.stringify({ message: 'Hello, server!' }));
});

// Event handler for incoming messages from the server
ws.on('message', function incoming(data) {
  console.log('Received message:', data);
});

// Event handler for when the connection is closed
ws.on('close', function close() {
  console.log('Disconnected from server');
});
