const expenses = [];

function calculateTotal(expenses) {
    const amounts = expenses.map((expense) => expense.amount);
    return amounts.reduce((total, amount) => total + amount, 0);
}

function calculateCategoryTotal(expenses, category) {
    return calculateTotal(expenses.filter((expense) => expense.category === category));
}

function findLargestExpense(expenses) {
    return expenses.reduce((biggest, expense) => {
        if (biggest === undefined) {
            return expense;
        }
        return expense.amount > biggest.amount ? expense : biggest;
    }, undefined)
}

function createExpenseSummary(expenses) {
    return {
        total: calculateTotal(expenses),
        foodTotal: calculateCategoryTotal(expenses, 'food'),
        transportTotal: calculateCategoryTotal(expenses, 'transport'),
        largestExpense: findLargestExpense(expenses)
    }
}

function updateExpenseSummary() {
    const summaryMessage = document.querySelector('#summary-message');
    if (expenses.length === 0) {
        summaryMessage.textContent = 'No expenses recorded';
    } else {
        const total = calculateTotal(expenses);
        const foodTotal = calculateCategoryTotal(expenses, 'food');
        const transportTotal = calculateCategoryTotal(expenses, 'transport');
        const largestExpense = findLargestExpense(expenses);
        summaryMessage.textContent =
            `
                Total: ${total}. Food Total: ${foodTotal}. Transport Total: ${transportTotal}. Largest expense is in 
                ${largestExpense.category} with a cost of ${largestExpense.amount}
            `;
    }
}

function addExpense(category, amount) {
    if (expenses.length === 0) {
        expenses.push({ id: 1, category, amount });
    } else {
        const ids = expenses.map(item => item.id);
        const nextId = Math.max(...ids) + 1;
        expenses.push({ id: nextId, category, amount });
    }
    
    const expense = expenses[expenses.length - 1];
    const expenseList = document.querySelector('#expenses-list');
    const newExpense = document.createElement('li');
    newExpense.textContent = `ID: ${expense.id}. Category: ${expense.category}. Amount: ${expense.amount}`;
    expenseList.append(newExpense);
}


const expenseForm = document.querySelector('#expense-form');
const categoryInput = document.querySelector('#category-input');
const amountInput = document.querySelector('#amount-input');
expenseForm.addEventListener('submit', (event) => {
    event.preventDefault();
    addExpense(categoryInput.value, Number(amountInput.value));
    updateExpenseSummary();
});