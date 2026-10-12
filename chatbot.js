const textField = document.getElementById('textField');
const inputText = document.getElementById('inputText');
const outputText = document.getElementById('outputText');
const sendBtn = document.getElementById('sendBtn');

sendBtn.addEventListener('click', () => {
    const userInput = textField.value;
    if(userInput.trim() !== "") {
        inputText.innerText = userInput;
    }
});