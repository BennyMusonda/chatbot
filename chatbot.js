// 0. CHATBOT CONVERSATION MEMORY
let userName = "";

// 1. SELECT HTML ELEMENTS
const chatContainer = document.getElementById('chatContainer');
const textField = document.getElementById('textField');
const sendBtn = document.getElementById('sendBtn');


// 2. SEND BUTTON EVENT LISTENER

sendBtn.addEventListener('click', () => {

    const userMessage = textField.value.trim();

    // CHECK EMPTY INPUT
    if(userMessage === "") {
        return;
    }

    // DISPLAY USER MESSAGE
    displayMessage(userMessage, "user");

    // CLEAR INPUT FIELD
    textField.value = "";

    // SHOW TYPING INDICATOR
    const typing = showTypingIndicator();

    // GENERATE RESPONSE AFTER 2 SECONDS
    setTimeout(() => {

        const response = chatbotResponse(userMessage);

        // REMOVE TYPING INDICATOR
        typing.remove();

        // DISPLAY CHATBOT RESPONSE
        displayMessage(response, "bot");

    }, 2000);

});


// 6. CHATBOT TYPING INDICATOR

function showTypingIndicator() {

    const typingMessage = document.createElement("div");

    typingMessage.classList.add("typing-indicator");

    typingMessage.textContent = "Messenger AI is typing...";

    chatContainer.appendChild(typingMessage);

    chatContainer.scrollTop = chatContainer.scrollHeight;

    return typingMessage;

}

// GENERATE CHATBOT RESPONSES

function chatbotResponse(userMessage) {

    // CONVERT MESSAGE TO LOWERCASE
    userMessage = userMessage.toLowerCase();

    //REMEMBER USER'S NAME
    if(userMessage.includes("my name is")) {

    userName = userMessage.replace("my name is", "").trim();

    return `Nice to meet you, ${userName}! I'll remember your name.`;

}

// RECALL USER'S NAME

else if(userMessage.includes("what is my name")) {

    if(userName !== "") {

        return `Your name is ${userName}!`;

    }

    else {

        return "I don't know your name yet. Tell me by saying: My name is then add your name.";

    }

}

    // GREETINGS
    if(userMessage.includes("hello") || userMessage.includes("hi") || userMessage.includes("hey")) {
        return "Hello! Welcome to Messenger AI. How can I help you?";
    }

    // ASKING ABOUT THE BOT
    else if(userMessage.includes("who are you")) {
        return "I am Messenger AI, a chatbot created by Benny!";
    }

    // ASKING ABOUT THE CREATOR
    else if(userMessage.includes("who created you") || userMessage.includes("your creator")) {
        return "I was created by Benny, a Tech Guy.";
    }

    // ASKING HOW THE BOT IS
    else if(userMessage.includes("how are you")) {
        return "I'm doing great! Thanks for asking. How about you?";
    }

    // SAYING GOODBYE
    else if(userMessage.includes("bye") || userMessage.includes("goodbye")) {
        return "Goodbye! Have a wonderful day.";
    }

    // THANKING THE BOT
    else if(userMessage.includes("thank you") || userMessage.includes("thanks")) {
        return "You're welcome! Happy to help.";
    }

    // UNKNOWN MESSAGE
    else {
        return "I'm still learning. Could you try asking me something else?";
    }
}

// 4. SEND MESSAGE USING ENTER KEY

textField.addEventListener('keydown', (event) => {

    if(event.key === "Enter") {

        sendBtn.click();

    }

});

// 5. CREATE MESSAGE FUNCTION

function displayMessage(message, sender) {

    // CREATE MESSAGE ROW
    const messageRow = document.createElement("div");

    // ADD CSS CLASS
    messageRow.classList.add("message-row", sender);

    // CREATE PROFILE IMAGE
    const profileImg = document.createElement("img");

    // SELECT PROFILE IMAGE
    if(sender === "user") {
        profileImg.src = "imgs/benny 1.jpg.jpeg";
    }
    else {
        profileImg.src = "imgs/PXL_20260828_133354894~2.jpg";
    }

    // CREATE MESSAGE BUBBLE
    const messageBubble = document.createElement("div");

    messageBubble.classList.add("message-bubble");

    // INSERT MESSAGE TEXT
    messageBubble.textContent = message;

    // ADD ELEMENTS TO MESSAGE ROW
    messageRow.appendChild(profileImg);

    messageRow.appendChild(messageBubble);

    // ADD MESSAGE ROW TO CHAT CONTAINER
    chatContainer.appendChild(messageRow);

}