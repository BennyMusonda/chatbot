// 1. SELECT HTML ELEMENTS

const inputText = document.getElementById('inputText');
const outputText = document.getElementById('outputText');
const textField = document.getElementById('textField');
const sendBtn = document.getElementById('sendBtn');


// 2. SEND BUTTON EVENT LISTENER

sendBtn.addEventListener('click', () => {

    const userMessage = textField.value.trim();

    // A. CHECK IF THE INPUT IS EMPTY

    if(userMessage === ""){
        return;
    }

    // B. DISPLAY USER MESSAGE

    inputText.textContent = userMessage;

    // C. CALL CHATBOT FUNCTION

    chatbotResponse(userMessage);

    // D. CLEAR INPUT FIELD

    textField.value = "";

});


// 3. CHATBOT RESPONSE FUNCTION

function chatbotResponse(userMessage){

    userMessage = userMessage.toLowerCase();

    if(userMessage === "hello"){
        outputText.textContent = "Hello! How are you today?";
    }

    else if(userMessage === "hi"){
        outputText.textContent = "Hi there, Welcome!";
    }

    else if(userMessage === "how are you?"){
        outputText.textContent = "I'm doing great! Thanks for asking.";
    }

    else if(userMessage === "who created you?"){
        outputText.textContent = "I was created by Benny, a Tech Guy.";
    }

    else if(userMessage === "bye"){
        outputText.textContent = "Goodbye! Have a wonderful day.";
    }

    else{
        outputText.textContent = "Sorry, I don't understand that yet.";
    }

}