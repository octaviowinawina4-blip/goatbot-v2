// handlers.js

// Function to handle incoming messages
function handleMessage(message) {
    // Process the message here
    console.log('Received message:', message);
    // Additional handling logic goes here
}

// Function to handle postbacks
function handlePostback(postback) {
    // Process the postback here
    console.log('Received postback:', postback);
    // Additional handling logic goes here
}

module.exports = { handleMessage, handlePostback };