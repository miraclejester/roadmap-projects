const currentItems = [];

function calculateSubtotal(items) {
    let total = 0;
    for (const item of items) {
        total += item.price * item.quantity;
    }
    return total;
}

function calculateDiscount(subtotal, discountPercent) {
    return subtotal * (discountPercent / 100);
}

function calculateTax(amountAfterDiscount, taxPercent) {
    return amountAfterDiscount * (taxPercent / 100);
}

function createCartSummary(items, discountPercent, taxPercent) {
    const subtotal = calculateSubtotal(items);
    const discount = calculateDiscount(subtotal, discountPercent);
    const tax = calculateTax(subtotal - discount, taxPercent);
    return {
        subtotal,
        discount,
        tax,
        total: (subtotal - discount) + tax
    };
}

function addItem(item) {
    const curItem = currentItems.find((i) => i.name === item.name && i.price === item.price);
    if (curItem === undefined) {
        currentItems.push({
            ...item,
            price: Number(item.price),
            quantity: Number(item.quantity)
        });
    } else {
        curItem.quantity += Number(item.quantity);
    }
}

const cartForm = document.querySelector('#cart-form');
const itemNameInput = document.querySelector('#item-name-input');
const itemPriceInput = document.querySelector('#item-price-input');
const itemQuantityInput = document.querySelector('#item-quantity-input');

const calculateForm = document.querySelector('#calculate-form');
const cartDiscountInput = document.querySelector('#cart-discount-input');
const cartTaxInput = document.querySelector('#cart-tax-input');

const priceTableBody = document.querySelector('#price-table-body');
const resultsDiv = document.querySelector('#results');

cartForm.addEventListener('submit', (event) => {
    event.preventDefault();
    
    addItem({
        name: itemNameInput.value,
        price: Number(itemPriceInput.value),
        quantity: Number(itemQuantityInput.value),
    });
    
    const newRows = [];
    for (const item of currentItems) {
        const rowBody = document.createElement('tr');
        
        const rowName = document.createElement('td');
        rowName.textContent = item.name;
        rowBody.append(rowName);
        
        const rowPrice = document.createElement('td');
        rowPrice.textContent = item.price;
        rowBody.append(rowPrice);
        
        const rowQuantity = document.createElement('td');
        rowQuantity.textContent = item.quantity;
        rowBody.append(rowQuantity);
        
        newRows.push(rowBody);
    }
    priceTableBody.replaceChildren(...newRows);
});

calculateForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const summary = createCartSummary(currentItems, Number(cartDiscountInput.value), Number(cartTaxInput.value));
    console.log(summary);
    resultsDiv.children.item(0).textContent = `Subtotal: ${summary.subtotal}`;
    resultsDiv.children.item(1).textContent = `Discount: ${summary.discount}`;
    resultsDiv.children.item(2).textContent = `Tax: ${summary.tax}`;
    resultsDiv.children.item(3).textContent = `Total: ${summary.total}`;
    
    currentItems.length = 0;
    priceTableBody.replaceChildren();
})
