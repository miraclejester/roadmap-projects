function formatName(firstName, lastName) {
    return `${firstName} ${lastName}`;
}

function getGreeting(timeOfDay) {
    const validTimes = ['morning', 'evening', 'afternoon'];
    if (validTimes.includes(timeOfDay)) {
        return `Good ${timeOfDay}`;
    } else{
        throw new Error(`${timeOfDay} is not a valid time`);
    }
}

function createGreeting(firstName, lastName, timeOfDay) {
    return `${getGreeting(timeOfDay)}, ${formatName(firstName, lastName)}`;
}

const greetingForm = document.querySelector('#greeting-form');
const nameInput = document.querySelector('#name');
const surnameInput = document.querySelector('#surname');
const timeOfDayInput = document.querySelector('#time-of-day');
const greetingList = document.querySelector('#greeting-list');

greetingForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const greeting = document.createElement('li');
    greeting.textContent = createGreeting(nameInput.value, surnameInput.value, timeOfDayInput.value);
    greetingList.append(greeting);
    
    nameInput.value = '';
    surnameInput.value = '';
    timeOfDayInput.selectIndex = 0;
})