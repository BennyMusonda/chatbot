// ======================================================
// MESSENGER AI
// MAIN CHATBOT ENGINE
// ======================================================


// ======================================================
// 1. SELECT HTML ELEMENTS
// ======================================================

const chatContainer = document.getElementById("chatContainer");

const textField = document.getElementById("textField");

const sendBtn = document.getElementById("sendBtn");

const clearChatBtn = document.getElementById("clearChatBtn");

const connectionStatus = document.getElementById("connectionStatus");

const statusText = document.getElementById("statusText");


// ======================================================
// 2. CHATBOT MEMORY VARIABLES
// ======================================================

let userName = "";

let userInterest = "";

let userLearning = "";

let chatHistory = [];


// ======================================================
// 3. LOAD PERSONAL MEMORY
// ======================================================

function loadMemory() {

    userName = localStorage.getItem("userName") || "";

    userInterest = localStorage.getItem("userInterest") || "";

    userLearning = localStorage.getItem("userLearning") || "";

}


// ======================================================
// 4. SAVE PERSONAL MEMORY
// ======================================================

function saveMemory() {

    localStorage.setItem("userName", userName);

    localStorage.setItem("userInterest", userInterest);

    localStorage.setItem("userLearning", userLearning);

}


// ======================================================
// 5. SAVE CHAT HISTORY
// ======================================================

function saveChatHistory() {

    localStorage.setItem("chatHistory", JSON.stringify(chatHistory));

}


// ======================================================
// 6. LOAD CHAT HISTORY
// ======================================================

function loadChatHistory() {

    const savedHistory = localStorage.getItem("chatHistory");

    if (!savedHistory) {
        return;
    }

    try {

        chatHistory = JSON.parse(savedHistory);

        if (!Array.isArray(chatHistory)) {
            chatHistory = [];
            return;
        }

        chatHistory.forEach(chat => {

            if (
                chat &&
                typeof chat.message === "string" &&
                ["user", "bot"].includes(chat.sender)
            ) {

                displayMessage(
                    chat.message,
                    chat.sender,
                    chat.time
                );

            }

        });

    } catch (error) {

        console.error("Could not load chat history:", error);

        chatHistory = [];

    }

}


// ======================================================
// 7. DISPLAY MESSAGES
// ======================================================

function displayMessage(message, sender, savedTime = null) {

    // CREATE MESSAGE ROW

    const messageRow = document.createElement("div");

    messageRow.classList.add("message-row", sender);


    // CREATE PROFILE IMAGE

    const profileImg = document.createElement("img");

    if (sender === "user") {

        profileImg.src = "imgs/benny 1.jpg.jpeg";

        profileImg.alt = "User";

    } else {

        profileImg.src = "imgs/PXL_20260828_133354894~2.jpg";

        profileImg.alt = "Messenger AI";

    }


    // CREATE MESSAGE BUBBLE

    const messageBubble = document.createElement("div");

    messageBubble.classList.add("message-bubble");


    // DISPLAY MESSAGE TEXT SAFELY

    messageBubble.textContent = message;


    // CREATE TIMESTAMP

    const timestamp = document.createElement("small");

    timestamp.classList.add("message-time");

    timestamp.textContent = savedTime || new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    });

    messageBubble.appendChild(timestamp);


    // ADD ELEMENTS TO MESSAGE ROW

    messageRow.appendChild(profileImg);

    messageRow.appendChild(messageBubble);


    // ADD MESSAGE TO CHAT

    chatContainer.appendChild(messageRow);


    // SCROLL TO LATEST MESSAGE

    chatContainer.scrollTop = chatContainer.scrollHeight;

}


// ======================================================
// 8. SAVE A MESSAGE TO CHAT HISTORY
// ======================================================

function saveMessage(message, sender) {

    const time = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    });

    chatHistory.push({

        message: message,

        sender: sender,

        time: time

    });

    saveChatHistory();

}


// ======================================================
// 9. SHOW TYPING INDICATOR
// ======================================================

function showTypingIndicator() {

    const typingMessage = document.createElement("div");

    typingMessage.classList.add("typing-indicator");

    typingMessage.innerHTML = `
        Messenger AI is typing
        <span></span>
        <span></span>
        <span></span>
    `;

    chatContainer.appendChild(typingMessage);

    chatContainer.scrollTop = chatContainer.scrollHeight;

    return typingMessage;

}


// ======================================================
// 10. NORMALIZE USER MESSAGE
// ======================================================

function normalizeMessage(message) {

    return message
        .toLowerCase()
        .replace(/[^\w\s]/g, " ")
        .replace(/\s+/g, " ")
        .trim();

}


// ======================================================
// 11. RANDOM GREETING RESPONSES
// ======================================================

const greetingResponses = [

    "Hello! How can I help you?",

    "Hey there! Welcome to Messenger AI.",

    "Hi! It's nice to chat with you.",

    "Hello! How is your day going?"

];


function randomGreeting() {

    const randomIndex = Math.floor(
        Math.random() * greetingResponses.length
    );

    return greetingResponses[randomIndex];

}


// ======================================================
// 12. CONVERT MATHEMATICAL WORDS INTO SYMBOLS
// ======================================================

function convertOperator(message) {

    if (/\b(plus|add|added to|increase)\b/.test(message)) {

        return "+";

    }

    else if (/\b(minus|subtract|take away|decrease)\b/.test(message)) {

        return "-";

    }

    else if (/\b(times|multiplied by|multiply)\b/.test(message)) {

        return "*";

    }

    else if (/\b(divided by|divide)\b/.test(message)) {

        return "/";

    }

    else if (/\b(remainder|modulo)\b/.test(message)) {

        return "%";

    }

    return null;

}


// ======================================================
// 13. BASIC CALCULATOR
// ======================================================

function calculate(firstNumber, operator, secondNumber) {

    if (operator === "+") {

        return firstNumber + secondNumber;

    }

    else if (operator === "-") {

        return firstNumber - secondNumber;

    }

    else if (operator === "*") {

        return firstNumber * secondNumber;

    }

    else if (operator === "/") {

        if (secondNumber === 0) {

            return "Cannot divide by zero!";

        }

        return firstNumber / secondNumber;

    }

    else if (operator === "%") {

        if (secondNumber === 0) {

            return "Cannot calculate a remainder using zero!";

        }

        return firstNumber % secondNumber;

    }

    return "Invalid mathematical operation.";

}


// ======================================================
// 14. HANDLE CALCULATOR MESSAGES
// ======================================================

function handleCalculation(message) {

    const numbers = message.match(/\d+(\.\d+)?/g);

    const symbolMatch = message.match(/[+\-*/%]/);

    const operator = symbolMatch
        ? symbolMatch[0]
        : convertOperator(message);

    if (!numbers || numbers.length !== 2 || !operator) {

        return "Please provide two numbers and a mathematical operator.";

    }

    const firstNumber = Number(numbers[0]);

    const secondNumber = Number(numbers[1]);

    const result = calculate(
        firstNumber,
        operator,
        secondNumber
    );

    if (typeof result === "number" && !Number.isFinite(result)) {

        return "I couldn't complete that calculation.";

    }

    return `The answer is ${result}.`;

}


// ======================================================
// 15. CHECK WHETHER MESSAGE IS A CALCULATION
// ======================================================

function isCalculation(message) {

    const hasTwoNumbers = (message.match(/\d+(\.\d+)?/g) || []).length === 2;

    const hasSymbol = /[+\-*/%]/.test(message);

    const hasWordOperator = convertOperator(message) !== null;

    return hasTwoNumbers && (hasSymbol || hasWordOperator);

}


// ======================================================
// 16. OFFLINE KNOWLEDGE SEARCH
// ======================================================

function searchKnowledge(message) {

    if (typeof knowledgeBase === "undefined") {

        return null;

    }

    const normalizedMessage = normalizeMessage(message);

    let bestMatch = null;

    let highestScore = 0;

    knowledgeBase.forEach(item => {

        let score = 0;

        item.keywords.forEach(keyword => {

            const normalizedKeyword = normalizeMessage(keyword);

            if (normalizedMessage.includes(normalizedKeyword)) {

                score += normalizedKeyword.split(" ").length;

            }

        });

        if (score > highestScore) {

            highestScore = score;

            bestMatch = item.answer;

        }

    });

    // REQUIRE A REASONABLE MATCH

    if (highestScore > 0) {

        return bestMatch;

    }

    return null;

}


// ======================================================
// 17. GENERATE OFFLINE RESPONSE
// ======================================================

function offlineResponse(userMessage) {

    const message = normalizeMessage(userMessage);


    // ----------------------------------------------
    // REMEMBER USER'S NAME
    // ----------------------------------------------

    if (message.startsWith("my name is ")) {

        userName = userMessage
            .trim()
            .replace(/^my name is\s+/i, "")
            .trim();

        if (!userName) {

            return "Please tell me your name.";

        }

        saveMemory();

        return `Nice to meet you, ${userName}! I'll remember your name.`;

    }


    // ----------------------------------------------
    // RECALL USER'S NAME
    // ----------------------------------------------

    if (message.includes("what is my name") || message.includes("what s my name")) {

        return userName
            ? `Your name is ${userName}!`
            : "I don't know your name yet. Tell me by saying: My name is Benny.";

    }


    // ----------------------------------------------
    // FORGET USER'S NAME
    // ----------------------------------------------

    if (message.includes("forget my name")) {

        userName = "";

        localStorage.removeItem("userName");

        return "Okay! I've forgotten your name.";

    }


    // ----------------------------------------------
    // REMEMBER USER'S LEARNING
    // ----------------------------------------------

    if (message.startsWith("i am learning ")) {

        userLearning = userMessage
            .replace(/^i am learning\s+/i, "")
            .trim();

        if (!userLearning) {

            return "What are you learning?";

        }

        saveMemory();

        return `That's wonderful! I'll remember that you're learning ${userLearning}.`;

    }


    // ----------------------------------------------
    // RECALL USER'S LEARNING
    // ----------------------------------------------

    if (message.includes("what am i learning")) {

        return userLearning
            ? `You're learning ${userLearning}!`
            : "You haven't told me what you're learning yet.";

    }


    // ----------------------------------------------
    // FORGET USER'S LEARNING
    // ----------------------------------------------

    if (message.includes("forget what i am learning")) {

        userLearning = "";

        localStorage.removeItem("userLearning");

        return "Okay! I've forgotten what you're learning.";

    }


    // ----------------------------------------------
    // REMEMBER USER'S INTERESTS
    // ----------------------------------------------

    if (message.startsWith("i am interested in ")) {

        userInterest = userMessage
            .replace(/^i am interested in\s+/i, "")
            .trim();

        if (!userInterest) {

            return "What are you interested in?";

        }

        saveMemory();

        return `That's interesting! I'll remember that you're interested in ${userInterest}.`;

    }


    // ----------------------------------------------
    // RECALL USER'S INTERESTS
    // ----------------------------------------------

    if (message.includes("what am i interested in")) {

        return userInterest
            ? `You're interested in ${userInterest}!`
            : "You haven't told me about your interests yet.";

    }


    // ----------------------------------------------
    // FORGET USER'S INTERESTS
    // ----------------------------------------------

    if (message.includes("forget my interests")) {

        userInterest = "";

        localStorage.removeItem("userInterest");

        return "Okay! I've forgotten your interests.";

    }


    // ----------------------------------------------
    // FORGET EVERYTHING
    // ----------------------------------------------

    if (message === "forget everything") {

        userName = "";

        userInterest = "";

        userLearning = "";

        localStorage.removeItem("userName");

        localStorage.removeItem("userInterest");

        localStorage.removeItem("userLearning");

        return "I've cleared all your saved personal memories.";

    }


    // ----------------------------------------------
    // ASKING FOR THE TIME
    // ----------------------------------------------

    if (/\b(what time is it|tell me the time|current time)\b/.test(message)) {

        const currentTime = new Date().toLocaleTimeString();

        return `The current time is ${currentTime}.`;

    }


    // ----------------------------------------------
    // ASKING FOR THE DATE
    // ----------------------------------------------

    if (/\b(what is today s date|what is the date today|tell me today s date|what is today)\b/.test(message)) {

        const today = new Date().toLocaleDateString("en-US", {

            year: "numeric",

            month: "long",

            day: "numeric"

        });

        return `Today's date is ${today}.`;

    }


    // ----------------------------------------------
    // MATHEMATICAL CALCULATIONS
    // ----------------------------------------------

    if (isCalculation(userMessage)) {

        return handleCalculation(userMessage);

    }


    // ----------------------------------------------
    // RANDOM GREETINGS
    // ----------------------------------------------

    if (/^(hello|hi|hey|good morning|good afternoon|good evening)\b/.test(message)) {

        return randomGreeting();

    }


    // ----------------------------------------------
    // SEARCH OFFLINE KNOWLEDGE
    // ----------------------------------------------

    const knowledgeAnswer = searchKnowledge(userMessage);

    if (knowledgeAnswer !== null) {

        return knowledgeAnswer;

    }


    // ----------------------------------------------
    // NO OFFLINE ANSWER FOUND
    // ----------------------------------------------

    return null;

}


// ======================================================
// 18. CONNECT TO FUTURE AI API
// ======================================================

async function getAIResponse(userMessage) {

    const response = await fetch("/api/chat", {

        method: "POST",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify({

            message: userMessage,

            history: chatHistory

        })

    });


    const data = await response.json();


    if (!response.ok) {

        throw new Error(
            data.error || "AI service is unavailable."
        );

    }


    if (!data.reply || typeof data.reply !== "string") {

        throw new Error("The AI returned an empty response.");

    }


    return data.reply;

}


// ======================================================
// 19. HANDLE USER MESSAGE
// ======================================================

async function sendMessage() {

    const userMessage = textField.value.trim();


    // CHECK EMPTY MESSAGE

    if (userMessage === "") {

        return;

    }


    // PREVENT MULTIPLE REQUESTS

    if (sendBtn.disabled) {

        return;

    }


    // DISABLE SEND BUTTON

    sendBtn.disabled = true;


    // DISPLAY USER MESSAGE

    displayMessage(userMessage, "user");


    // SAVE USER MESSAGE

    saveMessage(userMessage, "user");


    // CLEAR INPUT

    textField.value = "";


    // SHOW TYPING INDICATOR

    const typing = showTypingIndicator();


    try {

        // FIRST CHECK OFFLINE KNOWLEDGE

        let response = offlineResponse(userMessage);


        // ------------------------------------------
        // IF NO OFFLINE ANSWER EXISTS
        // TRY THE AI API
        // ------------------------------------------

        if (response === null) {

            if (navigator.onLine) {

                try {

                    response = await getAIResponse(userMessage);

                } catch (error) {

                    console.error("AI connection failed:", error);

                }

            }

        }


        // ------------------------------------------
        // IF NO API RESPONSE EXISTS
        // PROVIDE OFFLINE FALLBACK
        // ------------------------------------------

        if (response === null || !response) {

            response = navigator.onLine

                ? "I couldn't find a suitable answer. Please try asking in another way."

                : "I'm currently offline. I can still answer questions from my built-in knowledge, but I cannot answer every question without an internet connection.";

        }


        // REMOVE TYPING INDICATOR

        typing.remove();


        // DISPLAY BOT RESPONSE

        displayMessage(response, "bot");


        // SAVE BOT RESPONSE

        saveMessage(response, "bot");


    } catch (error) {

        console.error("Chatbot error:", error);

        typing.remove();

        const errorMessage = "Sorry, something went wrong. Please try again.";

        displayMessage(errorMessage, "bot");

        saveMessage(errorMessage, "bot");

    } finally {

        // ENABLE SEND BUTTON AGAIN

        sendBtn.disabled = false;

        textField.focus();

    }

}


// ======================================================
// 20. SEND BUTTON EVENT
// ======================================================

sendBtn.addEventListener("click", sendMessage);


// ======================================================
// 21. SEND MESSAGE USING ENTER KEY
// ======================================================

textField.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {

        event.preventDefault();

        sendMessage();

    }

});


// ======================================================
// 22. CLEAR CHAT HISTORY
// ======================================================

clearChatBtn.addEventListener("click", () => {

    const confirmClear = confirm(
        "Are you sure you want to clear your conversation?"
    );


    if (!confirmClear) {

        return;

    }


    // CLEAR CHAT ARRAY

    chatHistory = [];


    // REMOVE SAVED CHAT HISTORY

    localStorage.removeItem("chatHistory");


    // REMOVE MESSAGES FROM SCREEN

    chatContainer.querySelectorAll(
        ".message-row, .typing-indicator"
    ).forEach(element => {

        element.remove();

    });

});


// ======================================================
// 23. CHECK INTERNET CONNECTION
// ======================================================

function updateConnectionStatus() {

    if (navigator.onLine) {

        connectionStatus.classList.remove("offline");

        connectionStatus.classList.add("online");

        statusText.textContent = "Internet connection available";

    } else {

        connectionStatus.classList.remove("online");

        connectionStatus.classList.add("offline");

        statusText.textContent = "Offline mode";

    }

}


// LISTEN FOR INTERNET CONNECTION CHANGES

window.addEventListener("online", updateConnectionStatus);

window.addEventListener("offline", updateConnectionStatus);


// ======================================================
// 24. START MESSENGER AI
// ======================================================

// LOAD PERSONAL MEMORY

loadMemory();


// LOAD PREVIOUS CONVERSATIONS

loadChatHistory();


// CHECK INTERNET CONNECTION

updateConnectionStatus();


// FOCUS INPUT FIELD

textField.focus();


// ======================================================
// END OF MESSENGER AI
// ======================================================