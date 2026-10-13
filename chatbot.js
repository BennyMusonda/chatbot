// 1. SELECT HTML ELEMENT
const inputText = document.getElementById('inputText');
const outputText = document.getElementById('outputText');
const textField = document.getElementById('textField');
const sendBtn = document.getElementById('sendBtn');

// 2. SEND BUTTON EVENT LISTENER
sendBtn.addEventListener('click', () => {
    const userMessage = textField.value;
    inputText.textContent = userMessage;
});
