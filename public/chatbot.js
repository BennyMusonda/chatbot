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
// 2. SPLASH SCREEN
// ======================================================
window.addEventListener("load", function () {
    const splashScreen = document.getElementById("splashScreen");

    if (!splashScreen) return;

    setTimeout(function () {
        splashScreen.classList.add("hide");
    }, 5000);
});

// ======================================================
// 3. CHAT MEMORY
// ======================================================
let userName = "";
let userInterest = "";
let userLearning = "";
let chatHistory = [];

// ======================================================
// 4. MEMORY FUNCTIONS
// ======================================================
function loadMemory() {
    userName = localStorage.getItem("userName") || "";
    userInterest = localStorage.getItem("userInterest") || "";
    userLearning = localStorage.getItem("userLearning") || "";
}

function saveMemory() {
    localStorage.setItem("userName", userName);
    localStorage.setItem("userInterest", userInterest);
    localStorage.setItem("userLearning", userLearning);
}

// ======================================================
// 5. CHAT HISTORY FUNCTIONS
// ======================================================
function saveChatHistory() {
    localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
}

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
// 6. MESSAGE DISPLAY
// ======================================================
function displayMessage(message, sender, savedTime = null) {
    const messageRow = document.createElement("div");
    messageRow.classList.add("message-row", sender);

    const profileImg = document.createElement("img");

    if (sender === "user") {
        profileImg.src = "imgs/benny 1.jpg.jpeg";
        profileImg.alt = "User";
    } else {
        profileImg.src = "imgs/PXL_20260828_133354894~2.jpg";
        profileImg.alt = "Messenger AI";
    }

    const messageBubble = document.createElement("div");
    messageBubble.classList.add("message-bubble");
    messageBubble.textContent = message;

    const timestamp = document.createElement("small");
    timestamp.classList.add("message-time");
    timestamp.textContent = savedTime || new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    });

    messageBubble.appendChild(timestamp);
    messageRow.appendChild(profileImg);
    messageRow.appendChild(messageBubble);
    chatContainer.appendChild(messageRow);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

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
// 7. TEXT NORMALIZATION
// ======================================================
function normalizeMessage(message) {
    return message
        .toLowerCase()
        .replace(/[^\w\s]/g, " ")
        .replace(/\s+/g, " ")
        .trim();
}

// ======================================================
// 8. GREETING AND MATH HELPERS
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

function convertOperator(message) {
    if (/\b(plus|add|added to|increase)\b/.test(message)) {
        return "+";
    } else if (/\b(minus|subtract|take away|decrease)\b/.test(message)) {
        return "-";
    } else if (/\b(times|multiplied by|multiply)\b/.test(message)) {
        return "*";
    } else if (/\b(divided by|divide)\b/.test(message)) {
        return "/";
    } else if (/\b(remainder|modulo)\b/.test(message)) {
        return "%";
    }

    return null;
}

function calculate(firstNumber, operator, secondNumber) {
    if (operator === "+") {
        return firstNumber + secondNumber;
    } else if (operator === "-") {
        return firstNumber - secondNumber;
    } else if (operator === "*") {
        return firstNumber * secondNumber;
    } else if (operator === "/") {
        if (secondNumber === 0) {
            return "Cannot divide by zero!";
        }

        return firstNumber / secondNumber;
    } else if (operator === "%") {
        if (secondNumber === 0) {
            return "Cannot calculate a remainder using zero!";
        }

        return firstNumber % secondNumber;
    }

    return "Invalid mathematical operation.";
}

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

function isCalculation(message) {
    const hasTwoNumbers = (message.match(/\d+(\.\d+)?/g) || []).length === 2;
    const hasSymbol = /[+\-*/%]/.test(message);
    const hasWordOperator = convertOperator(message) !== null;

    return hasTwoNumbers && (hasSymbol || hasWordOperator);
}

// ======================================================
// 9. OFFLINE KNOWLEDGE
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

    if (highestScore > 0) {
        return bestMatch;
    }

    return null;
}

// ======================================================
// 10. OFFLINE RESPONSES
// ======================================================
function offlineResponse(userMessage) {
    const message = normalizeMessage(userMessage);

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

    if (message.includes("what is my name") || message.includes("what s my name")) {
        return userName
            ? `Your name is ${userName}!`
            : "I don't know your name yet. Tell me by saying: My name is Benny.";
    }

    if (message.includes("forget my name")) {
        userName = "";
        localStorage.removeItem("userName");

        return "Okay! I've forgotten your name.";
    }

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

    if (message.includes("what am i learning")) {
        return userLearning
            ? `You're learning ${userLearning}!`
            : "You haven't told me what you're learning yet.";
    }

    if (message.includes("forget what i am learning")) {
        userLearning = "";
        localStorage.removeItem("userLearning");

        return "Okay! I've forgotten what you're learning.";
    }

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

    if (message.includes("what am i interested in")) {
        return userInterest
            ? `You're interested in ${userInterest}!`
            : "You haven't told me about your interests yet.";
    }

    if (message.includes("forget my interests")) {
        userInterest = "";
        localStorage.removeItem("userInterest");

        return "Okay! I've forgotten your interests.";
    }

    if (message === "forget everything") {
        userName = "";
        userInterest = "";
        userLearning = "";

        localStorage.removeItem("userName");
        localStorage.removeItem("userInterest");
        localStorage.removeItem("userLearning");

        return "I've cleared all your saved personal memories.";
    }

    if (/\b(what time is it|tell me the time|current time)\b/.test(message)) {
        const currentTime = new Date().toLocaleTimeString();

        return `The current time is ${currentTime}.`;
    }

    if (/\b(what is today s date|what is the date today|tell me today s date|what is today)\b/.test(message)) {
        const today = new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric"
        });

        return `Today's date is ${today}.`;
    }

    if (isCalculation(userMessage)) {
        return handleCalculation(userMessage);
    }

    if (/^(hello|hi|hey|good morning|good afternoon|good evening)\b/.test(message)) {
        return randomGreeting();
    }

    const knowledgeAnswer = searchKnowledge(userMessage);

    if (knowledgeAnswer !== null) {
        return knowledgeAnswer;
    }

    return null;
}

// ======================================================
// 11. AI API
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
// 12. MESSAGE FLOW
// ======================================================
async function sendMessage() {
    const userMessage = textField.value.trim();

    if (userMessage === "") {
        return;
    }

    if (sendBtn.disabled) {
        return;
    }

    sendBtn.disabled = true;
    displayMessage(userMessage, "user");
    saveMessage(userMessage, "user");
    textField.value = "";

    const typing = showTypingIndicator();

    try {
        let response = offlineResponse(userMessage);

        if (response === null) {
            if (navigator.onLine) {
                try {
                    response = await getAIResponse(userMessage);
                } catch (error) {
                    console.error("AI connection failed:", error);
                }
            }
        }

        if (response === null || !response) {
            response = navigator.onLine
                ? "I couldn't find a suitable answer. Please try asking in another way."
                : "I'm currently offline. I can still answer questions from my built-in knowledge, but I cannot answer every question without an internet connection.";
        }

        typing.remove();
        displayMessage(response, "bot");
        saveMessage(response, "bot");
    } catch (error) {
        console.error("Chatbot error:", error);
        typing.remove();

        const errorMessage = "Sorry, something went wrong. Please try again.";
        displayMessage(errorMessage, "bot");
        saveMessage(errorMessage, "bot");
    } finally {
        sendBtn.disabled = false;
        textField.focus();
    }
}

// ======================================================
// 13. EVENT HANDLERS
// ======================================================
sendBtn.addEventListener("click", sendMessage);

textField.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        sendMessage();
    }
});

clearChatBtn.addEventListener("click", () => {
    const confirmClear = confirm(
        "Are you sure you want to clear your conversation?"
    );

    if (!confirmClear) {
        return;
    }

    chatHistory = [];
    localStorage.removeItem("chatHistory");

    chatContainer.querySelectorAll(
        ".message-row, .typing-indicator"
    ).forEach(element => {
        element.remove();
    });
});

// ======================================================
// 14. CONNECTION STATUS
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

window.addEventListener("online", updateConnectionStatus);
window.addEventListener("offline", updateConnectionStatus);

// ======================================================
// 15. STARTUP
// ======================================================
loadMemory();
loadChatHistory();
updateConnectionStatus();
textField.focus();

// ======================================================
// 15. LIVE VOICE CHAT - VISUAL DESIGN ONLY
// ======================================================

const voiceScreen = document.getElementById("voiceScreen");

const voiceLaunchBtn = document.getElementById("voiceLaunchBtn");

const voiceCloseBtn = document.getElementById("voiceCloseBtn");

const voiceMuteBtn = document.getElementById("voiceMuteBtn");

const voiceMuteLabel = document.getElementById("voiceMuteLabel");

const voiceEndBtn = document.getElementById("voiceEndBtn");

const voicePreviewBtn = document.getElementById("voicePreviewBtn");

const voiceStateTitle = document.getElementById("voiceStateTitle");

const voiceStateDescription = document.getElementById("voiceStateDescription");


// OPEN VOICE CHAT

function openVoiceChat() {

    if (!voiceScreen) return;

    voiceScreen.hidden = false;

    voiceScreen.classList.remove(
        "is-speaking",
        "is-listening"
    );

    voiceStateTitle.textContent = "Ready when you are";

    voiceStateDescription.textContent =
        "Start a conversation with your AI assistant.";

    voiceMuteBtn.classList.remove("is-muted");

    voiceMuteBtn.querySelector("i").className =
        "fa-solid fa-microphone";

    voiceMuteLabel.textContent = "Mute";

}


// CLOSE VOICE CHAT

function closeVoiceChat() {

    if (!voiceScreen) return;

    voiceScreen.hidden = true;

    voiceScreen.classList.remove(
        "is-speaking",
        "is-listening"
    );

}


// OPEN BUTTON

if (voiceLaunchBtn) {

    voiceLaunchBtn.addEventListener(
        "click",
        openVoiceChat
    );

}


// CLOSE BUTTON

if (voiceCloseBtn) {

    voiceCloseBtn.addEventListener(
        "click",
        closeVoiceChat
    );

}


// END CALL BUTTON

if (voiceEndBtn) {

    voiceEndBtn.addEventListener(
        "click",
        closeVoiceChat
    );

}


// MUTE BUTTON

if (voiceMuteBtn) {

    voiceMuteBtn.addEventListener("click", () => {

        const muted = voiceMuteBtn.classList.toggle("is-muted");

        voiceMuteBtn.querySelector("i").className = muted
            ? "fa-solid fa-microphone-slash"
            : "fa-solid fa-microphone";

        voiceMuteLabel.textContent = muted
            ? "Muted"
            : "Mute";

        voiceStateTitle.textContent = muted
            ? "Microphone muted"
            : "Ready when you are";

        voiceStateDescription.textContent = muted
            ? "Your microphone control is shown as muted. Voice input is not connected yet."
            : "The visual voice-chat design is ready to preview.";

        voiceScreen.classList.remove(
            "is-speaking",
            "is-listening"
        );

    });

}


// PREVIEW SPEAKING ANIMATION

if (voicePreviewBtn) {

    voicePreviewBtn.addEventListener("click", () => {

        const speaking = voiceScreen.classList.toggle("is-speaking");

        voiceScreen.classList.remove("is-listening");

        voiceStateTitle.textContent = speaking
            ? "Messenger AI is speaking"
            : "Ready when you are";

        voiceStateDescription.textContent = speaking
            ? "This is a visual preview of the AI response animation."
            : "Start a conversation with your AI assistant.";

    });

}

// ======================================================
// END OF MESSENGER AI
// ======================================================