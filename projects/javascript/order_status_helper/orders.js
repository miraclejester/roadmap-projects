function isPaid(order) {
    return order.payment.status === 'paid';
}

function hasShipped(order) {
    return order.shipping.status === 'shipped';
}

function getDeliveryMessage(order) {
    if (hasShipped(order)) {
        return `Order shipped. Estimated delivery: ${order.shipping.estimatedDelivery}`
    }
    
    return `Order has not shipped yet.`;
}

function needsAttention(order) {
    return !isPaid(order) || !hasShipped(order);
}

function createOrderSummary(order) {
    return {
        id: order.id,
        customerName: order.customer.name,
        paid: isPaid(order),
        shipped: hasShipped(order),
        itemCount: order.items.reduce((total, item) => {
            return total + item.quantity;
        }, 0),
        deliveryMessage: getDeliveryMessage(order),
        needsAttention: needsAttention(order)
    }
}

function showOrderSummary(order) {
    const summaryContainer = document.querySelector('#summary-container');
    const currentSummary = createOrderSummary(order);
    const elements = [];
    
    const idElement = document.createElement('p');
    idElement.textContent = `ID: ${currentSummary.id}`;
    elements.push(idElement);
    
    const nameElement = document.createElement('p');
    nameElement.textContent = `Name: ${currentSummary.customerName}`;
    elements.push(nameElement);
    
    const paidElement = document.createElement('p');
    paidElement.textContent = currentSummary.paid ? 'Order has been paid' : 'Order has not been paid';
    elements.push(paidElement);
    
    const messageElement = document.createElement('p');
    messageElement.textContent = currentSummary.deliveryMessage;
    elements.push(messageElement);
    
    const attentionElement = document.createElement('p');
    attentionElement.textContent = currentSummary.needsAttention ? 'The order needs attention' : 'The order is fine';
    elements.push(attentionElement);
    
    summaryContainer.replaceChildren(...elements);
}

function addNewItemInput() {
    const inputContainer = document.querySelector('#order-items-input-container');
    const index = inputContainer.children.length;
    
    const singleInputContainer = document.createElement('div');
    singleInputContainer.classList.add('new-item-input-container');
    
    const nameLabelElement = document.createElement('label');
    nameLabelElement.htmlFor = `new-item-name-input-${index}`;
    nameLabelElement.textContent = 'Item Name';
    singleInputContainer.appendChild(nameLabelElement);
    
    const nameInputElement = document.createElement('input');
    nameInputElement.type = 'text';
    nameInputElement.required = true;
    nameInputElement.id = `new-item-name-input-${index}`;
    nameInputElement.classList.add('new-item-name-input');
    singleInputContainer.appendChild(nameInputElement);

    const quantityLabelElement = document.createElement('label');
    quantityLabelElement.htmlFor = `new-item-quantity-input-${index}`;
    quantityLabelElement.textContent = 'Item Quantity';
    singleInputContainer.appendChild(quantityLabelElement);

    const quantityInputElement = document.createElement('input');
    quantityInputElement.type = 'number';
    quantityInputElement.required = true;
    quantityInputElement.min = "1";
    quantityInputElement.step = "1";
    quantityInputElement.id = `new-item-quantity-input-${index}`;
    quantityInputElement.classList.add('new-item-quantity-input');
    singleInputContainer.appendChild(quantityInputElement);
    
    inputContainer.appendChild(singleInputContainer);
}

function getNewItemsFromInputs() {
    const inputContainers = document.querySelectorAll('.new-item-input-container').values();
    
    return inputContainers.map((container) => {
        const itemName = container.querySelector('.new-item-name-input').value;
        const itemQuantity = Number(container.querySelector('.new-item-quantity-input').value);
        return {
            name: itemName,
            quantity: itemQuantity
        }
    }).toArray();
}

function createOrderFromInputs() {
    const id = document.querySelector('#id-input').value;
    const name = document.querySelector('#name-input').value;
    const email = document.querySelector('#email-input').value;
    const payStatus = document.querySelector('#paid-input').value;
    const shippingStatus = document.querySelector('#shipping-input').value;
    const estimated = document.querySelector('#estimated-input').value;
    const items = getNewItemsFromInputs();
    
    return {
        id,
        customer: {
            name,
            email
        },
        payment: {
            status: payStatus
        },
        shipping: {
            status: shippingStatus,
            estimatedDelivery: estimated,
        },
        items
    }
}

const addItemButton = document.querySelector('#add-item-button');
addItemButton.addEventListener('click', addNewItemInput);

const removeLastItemButton = document.querySelector('#remove-last-item-button');
removeLastItemButton.addEventListener('click', () => {
    const inputContainer = document.querySelector('#order-items-input-container');
    if (inputContainer.children.length === 0) {
        return;
    }
    
    inputContainer.removeChild(inputContainer.children[inputContainer.children.length - 1]);
});

const orderForm = document.querySelector('#order-form');
orderForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const order = createOrderFromInputs();
    console.log(order);
    showOrderSummary(order);
});