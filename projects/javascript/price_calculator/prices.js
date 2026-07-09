function calculateDiscount(price, discountPercent) {
    return price * (discountPercent / 100);
}

function calculateTax(priceAfterDiscount, taxPercent) {
    return priceAfterDiscount * (taxPercent / 100);
}

function calculateFinalPrice(price, discountPercent, taxPercent) {
    const priceAfterDiscount = price - calculateDiscount(price, discountPercent);
    return priceAfterDiscount + calculateTax(priceAfterDiscount, taxPercent);
}

function createPriceSummary(price, discountPercent, taxPercent) {
    const discount = calculateDiscount(price, discountPercent);
    const tax = calculateTax(price - discount, taxPercent);
    return {
        price,
        discount,
        tax,
        finalPrice: calculateFinalPrice(price, discountPercent, taxPercent)
    }
}

const priceForm = document.querySelector('#price-form');
const priceInput = document.querySelector('#price-value');
const discountInput = document.querySelector('#price-discount');
const taxInput = document.querySelector('#price-tax');
const initialPriceText = document.querySelector('#initial-price');
const discountText = document.querySelector('#discount');
const taxText = document.querySelector('#tax');
const finalPriceText = document.querySelector('#final-price');

priceForm.addEventListener('submit', (event) => {
    event.preventDefault();
    
    const priceObject = createPriceSummary(priceInput.value, discountInput.value, taxInput.value);
    initialPriceText.textContent = `Initial Price: ${priceObject.price}`;
    discountText.textContent = `Discount: ${priceObject.discount}`;
    taxText.textContent = `Tax: ${priceObject.tax}`;
    finalPriceText.textContent = `Final Price: ${priceObject.finalPrice}`;
});