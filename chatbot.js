// 1. SELECT HTML ELEMENT
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

    // C. CLEAR THE INPUT FIELD AFTER SENDING MESSAGE
    textField.value = "";
});
