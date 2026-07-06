function cleanText(text) {
    return text.trim();
}

function capitalize(text) {
    return `${text.charAt(0).toUpperCase()}${text.slice(1).toLowerCase()}`;
}

function formatDisplayName(firstName, lastName) {
    return `${capitalize(cleanText(firstName))} ${capitalize(cleanText(lastName))}`;
}

const nameForm = document.querySelector('#name-form');
const nameInput = document.querySelector('#name');
const surnameInput = document.querySelector('#surname');
const formattedText = document.querySelector('#formatted-name')

nameForm.addEventListener('submit', (event) => {
    event.preventDefault();
    formattedText.textContent = formatDisplayName(nameInput.value, surnameInput.value);
});