function hasMinimumLength(password) {
    return password.length >= 8;
}

function hasNumber(password) {
    return /\d/.test(password);
}

function hasUppercaseLetter(password) {
    return /[A-Z]/.test(password);
}

function getFailedRules(password) {
    const failedRules = [];
    if (!hasMinimumLength(password)) {
        failedRules.push('minimum length');
    }
    
    if (!hasNumber(password)) {
        failedRules.push('number');
    }
    
    if (!hasUppercaseLetter(password)) {
        failedRules.push('uppercase letter');
    }
    return failedRules;
}

function validatePassword(password) {
    const failedRules = getFailedRules(password);
    return {
        valid: failedRules.length === 0,
        failedRules
    }
}

const passwordForm = document.querySelector('#password-form');
const passwordInput = document.querySelector('#password-input');
const validationMessage = document.querySelector('#validation-message');

passwordForm.addEventListener('submit', (event) => {
   event.preventDefault();
   const validationData = validatePassword(passwordInput.value);
   const validStatus = validationData.valid ? 'valid' : 'invalid';
   const reasons = validationData.failedRules.join(', ');
   const reasonsMessage = validationData.valid ? '' : ` Reasons: ${reasons}`;
   validationMessage.textContent = `Password is ${validStatus}.${reasonsMessage}`;
});