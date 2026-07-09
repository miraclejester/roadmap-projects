function isPositive(number) {
    return number > 0;
}

function isNegative(number) {
    return number < 0;
}

function isZero(number) {
    return number === 0;
}

function isEven(number) {
    return number % 2 === 0;
}

function describeNumber(number) {
    const even = isEven(number);
    return {
        positive: isPositive(number),
        negative: isNegative(number),
        zero: isZero(number),
        even,
        odd: !even
    }
}

const checkerForm = document.querySelector('#checker-form');
const valueInput = document.querySelector('#number-value');
const checkerMessage = document.querySelector('#checker-message');

checkerForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const checkObject = describeNumber(valueInput.value);
    
    const posCheck = checkObject.positive ? "positive" : (checkObject.negative ? "negative": "zero");
    const evenCheck = checkObject.even ? "even" : "odd";
    checkerMessage.textContent = `This number is ${posCheck} and is ${evenCheck}`;
});