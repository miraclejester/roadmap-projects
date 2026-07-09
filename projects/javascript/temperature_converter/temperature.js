function celsiusToFahrenheit(celsius) {
    return (celsius * 1.8) + 32;
}

function fahrenheitToCelsius(fahrenheit) {
    return (fahrenheit - 32) / 1.8;
}

function formatTemperature(value, unit) {
    const formattedValue = Number(value).toFixed(2);
    return `${formattedValue} ${unit}`;
}


const tempForm = document.querySelector('#temp-form');
const valueInput = document.querySelector('#temperature-value');
const unitInput = document.querySelector('#temperature-unit');
const message = document.querySelector('#temperature-message');

tempForm.addEventListener('submit', (event) => {
    event.preventDefault();
    let prev = '';
    let last = ''
    if (unitInput.value === 'C') {
        prev = formatTemperature(valueInput.value, 'C');
        last = formatTemperature(celsiusToFahrenheit(valueInput.value), 'F');
    } else if (unitInput.value === 'F') {
        prev = formatTemperature(valueInput.value, 'F');
        last = formatTemperature(fahrenheitToCelsius(valueInput.value), 'C');
    } else {
        return;
    }
    
    message.textContent = `${prev} is ${last}`
})