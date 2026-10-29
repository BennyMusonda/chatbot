// 0. CHATBOT CONVERSATION MEMORY
// CHATBOT CONVERSATION MEMORY

let userName = "";
let userInterest = "";
let userLearning = "";

// 1. SELECT HTML ELEMENTS
const clearChatBtn = document.getElementById("clearChatBtn");
const chatContainer = document.getElementById('chatContainer');
const textField = document.getElementById('textField');
const sendBtn = document.getElementById('sendBtn');

// SAVE USER MEMORY

function saveMemory() {

    localStorage.setItem("userName", userName);

    localStorage.setItem("userInterest", userInterest);

    localStorage.setItem("userLearning", userLearning);

}

// LOAD USER MEMORY

function loadMemory() {

    userName = localStorage.getItem("userName") || "";

    userInterest = localStorage.getItem("userInterest") || "";

    userLearning = localStorage.getItem("userLearning") || "";

}

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

// GENERATE CHATBOT RESPONSE

// RANDOM GREETING RESPONSES

const greetingResponses = [
    "Hello! How can I help you?",
    "Hey there! Welcome to Messenger AI.",
    "Hi! It's nice to chat with you.",
    "Hello! How is your day going?"
];

// CHATBOT RESPONSES

const botResponses = {

    greeting: "Hello! Welcome to Messenger AI. How can I help you?",

    identity: "I am Messenger AI, a chatbot created by Benny!",

    creator: "I was created by Benny, a Tech Guy.",

    wellbeing: "I'm doing great! Thanks for asking. How about you?",

    goodbye: "Goodbye! Have a wonderful day.",

    thanks: "You're welcome! Happy to help.",

    abilities: "I can chat with you, remember your information, and help answer basic questions!"

};

function chatbotResponse(userMessage) {

    // CONVERT MESSAGE TO LOWERCASE
    userMessage = userMessage.toLowerCase();

    //REMEMBER USER'S NAME
    if(userMessage.includes("my name is")) {

    userName = userMessage.replace("my name is", "").trim();

    saveMemory();

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

// FORGET USER'S NAME

else if(userMessage.includes("forget my name")) {

    userName = "";

    localStorage.removeItem("userName");

    return "Okay! I've forgotten your name.";

}

// REMEMBER WHAT THE USER IS LEARNING

else if(userMessage.includes("i am learning")) {

    userLearning = userMessage.replace("i am learning", "").trim();

    saveMemory();

    return `That's wonderful! I'll remember that you're learning ${userLearning}.`;

}

// RECALL WHAT THE USER IS LEARNING

else if(userMessage.includes("what am i learning")) {

    if(userLearning !== "") {

        return `You're learning ${userLearning}!`;

    }

    else {

        return "You haven't told me what you're learning yet.";

    }

}

// FORGET WHAT THE USER IS LEARNING

else if(userMessage.includes("forget what i am learning")) {

    userLearning = "";

    localStorage.removeItem("userLearning");

    return "Okay! I've forgotten what you're learning.";

}

// REMEMBER USER INTERESTS

else if(userMessage.includes("i am interested in")) {

    userInterest = userMessage.replace("i am interested in", "").trim();
    
    saveMemory();

    return `That's interesting! I'll remember that you're interested in ${userInterest}.`;

}
// RECALL USER INTERESTS

else if(userMessage.includes("what am i interested in")) {

    if(userInterest !== "") {

        return `You're interested in ${userInterest}!`;

    }

    else {

        return "You haven't told me about your interests yet.";

    }

}

// FORGET USER'S INTERESTS

else if(userMessage.includes("forget my interests")) {

    userInterest = "";

    localStorage.removeItem("userInterest");

    return "Okay! I've forgotten your interests.";

}

// CLEAR ALL CHATBOT MEMORIES

else if(userMessage.includes("forget everything")) {

    userName = "";

    userInterest = "";

    userLearning = "";

    localStorage.removeItem("userName");

    localStorage.removeItem("userInterest");

    localStorage.removeItem("userLearning");

    return "I've cleared all your saved memories.";

}

 // GREETINGS
if(/\b(hello|hi|hey|good morning|good afternoon|good evening)\b/.test(userMessage)) {

    const randomIndex = Math.floor(Math.random() * greetingResponses.length);

    return greetingResponses[randomIndex];

}

    // ASKING ABOUT THE CREATOR
    else if(userMessage.includes("who are you")) {
    return botResponses.identity;
}

    // ASKING HOW THE BOT IS
    else if(userMessage.includes("how are you")) {
        return botResponses.wellbeing;
    }

    // SAYING GOODBYE
    // GOODBYE
else if(/\b(bye|goodbye|see you|see you later)\b/.test(userMessage)) {
    return botResponses.goodbye;
}

    // THANK YOU
else if(/\b(thanks|thank you|thank you so much)\b/.test(userMessage)) {
    return botResponses.thanks;
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
    // CREATE MESSAGE TIMESTAMP

const timestamp = document.createElement("small");

timestamp.classList.add("message-time");

timestamp.textContent = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
});

messageBubble.appendChild(timestamp);

    // ADD ELEMENTS TO MESSAGE ROW
    messageRow.appendChild(profileImg);

    messageRow.appendChild(messageBubble);

    // ADD MESSAGE ROW TO CHAT CONTAINER
    chatContainer.appendChild(messageRow);

}

// CLEAR CHAT HISTORY

clearChatBtn.addEventListener("click", () => {

    // ASK FOR CONFIRMATION
    const confirmClear = confirm("Are you sure you want to clear your chat?");

    if(confirmClear) {

        // CLEAR SAVED CHAT HISTORY
        chatHistory = [];

        localStorage.removeItem("chatHistory");

        // REMOVE MESSAGES FROM THE SCREEN
        chatContainer.querySelectorAll(".message-row, .typing-indicator").forEach(element => {
            element.remove();
        });

    }

});

// LOAD MEMORY WHEN CHATBOT STARTS

loadMemory();