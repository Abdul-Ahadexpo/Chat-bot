// Function to send a message to ChatBot API
function sendMessageToChatBot(message) {
    // Replace 'YOUR_ACCESS_TOKEN' with your actual Developer Access Token
    var accessToken = 'YOUR_ACCESS_TOKEN';
    
    // Endpoint for sending messages
    var apiUrl = 'https://api.chatbot.com/v2/messages';
    
    // Constructing the request
    var requestData = {
        messages: [
            {
                role: 'user',
                content: message
            }
        ]
    };
    
    // Configuring fetch request
    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken
        },
        body: JSON.stringify(requestData)
    })
    .then(response => response.json())
    .then(data => {
        // Handle API response
        handleChatBotResponse(data);
    })
    .catch(error => {
        console.error('Error sending message to ChatBot API:', error);
        appendMessage('ChatBot', 'Oops! Something went wrong.');
    });
}

// Function to handle response from ChatBot API
function handleChatBotResponse(data) {
    if (data.messages && data.messages.length > 0) {
        var chatBotResponse = data.messages[0].content;
        appendMessage('ChatBot', chatBotResponse);
    } else {
        console.error('Unexpected response format from ChatBot API:', data);
        appendMessage('ChatBot', 'Oops! Something went wrong.');
    }
}

// Function to append messages to the chat interface
function appendMessage(sender, message) {
    var chatBox = document.getElementById('chat-box');
    var messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatBox.appendChild(messageElement);

    // Scroll to bottom of chat box
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Example of sending message to ChatBot API when user clicks send button
function sendMessage() {
    var userInput = document.getElementById('user-input').value.trim();
    if (userInput === '') {
        return;
    }

    appendMessage('You', userInput);
    sendMessageToChatBot(userInput);

    // Clear input field
    document.getElementById('user-input').value = '';
}
