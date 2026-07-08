function getDisplayName(user) {
    return `${user.firstName} ${user.lastName}`;
}

function getLocation(user) {
    return `${user.address.city}, ${user.address.country}`;
}

function getContactSummary(user) {
    return {
        email: user.email,
        phone: user.phone
    }
}

function isAccountActive(user) {
    return user.account.status === 'active';
}

function createProfileSummary(user) {
    return {
        displayName: getDisplayName(user),
        location: getLocation(user),
        contact: getContactSummary(user),
        active: isAccountActive(user),
        plan: user.account.plan
    }
}

const user = {
    id: 42,
    firstName: 'Ava',
    lastName: 'Stone',
    email: 'ava@example.com',
    phone: null,
    address: {
        city: 'London',
        country: 'UK',
    },
    account: {
        status: 'active',
        plan: 'pro',
    },
};

const userForm = document.querySelector('#user-form');
const idInput = document.querySelector('#id-input');
const firstNameInput = document.querySelector('#first-name-input');
const lastNameInput = document.querySelector('#last-name-input');
const emailInput = document.querySelector('#email-input');
const phoneInput = document.querySelector('#phone-input');
const cityInput = document.querySelector('#city-input');
const countryInput = document.querySelector('#country-input');
const statusInput = document.querySelector('#status-input');
const planInput = document.querySelector('#plan-input');

const userSummary = document.querySelector('#user-summary');

userForm.addEventListener('submit', (event) => {
   event.preventDefault();
   const user = {
       id: Number(idInput.value),
       firstName: firstNameInput.value,
       lastName: lastNameInput.value,
       email: emailInput.value,
       phone: phoneInput.value !== "" ? phoneInput.value : null,
       address: {
           city: cityInput.value,
           country: countryInput.value,
       },
       account: {
           status: statusInput.value,
           plan: planInput.value
       }
   }
   const summary = createProfileSummary(user);
   const phoneValue = summary.contact.phone ?? "No phone provided";
   const activeText = summary.active ? "active" : "not active";
   
   const displayElement = document.createElement('p');
   displayElement.textContent = `Display Name: ${summary.displayName}`;

   const locationElement = document.createElement('p');
   locationElement.textContent = `Location: ${summary.location}`;

   const contactElement = document.createElement('p');
   contactElement.textContent = `Contact: ${summary.contact.email} (${phoneValue})`;

   const statusElement = document.createElement('p');
   statusElement.textContent = `User is ${activeText} with plan ${summary.plan}`;
   
   userSummary.replaceChildren(displayElement, locationElement, contactElement, statusElement);
});