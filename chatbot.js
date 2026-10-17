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

    // GENERATE CHATBOT RESPONSE
    const response = chatbotResponse(userMessage);

    // DISPLAY CHATBOT RESPONSE
    displayMessage(response, "bot");

    // CLEAR INPUT FIELD
    textField.value = "";

});

// 3. CHATBOT RESPONSE FUNCTION

function chatbotResponse(userMessage) {

    userMessage = userMessage.toLowerCase();

    if(userMessage === "hello") {

        return "Hello! How are you today?";

    }

    else if(userMessage === "hi") {

        return "Hi there! Welcome!";

    }

    else if(userMessage === "how are you?") {

        return "I'm doing great! Thanks for asking.";

    }

    else if(userMessage === "who created you?") {

        return "I was created by Benny, a Tech Guy.";

    }

    else if(userMessage === "bye") {

        return "Goodbye! Have a wonderful day.";

    }

    else {

        return "Sorry, I don't understand that yet.";

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