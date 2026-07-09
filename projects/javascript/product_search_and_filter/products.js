const products = [
    { id: 1, name: 'Notebook', category: 'stationery', price: 10, inStock: true },
    { id: 2, name: 'Desk Lamp', category: 'home', price: 35, inStock: false },
    { id: 3, name: 'Pen Set', category: 'stationery', price: 6, inStock: true },
    {
        id: 4,
        name: 'Water Bottle',
        category: 'fitness',
        price: 18,
        inStock: true,
    },
];

function filterByCategory(products, category) {
    return products.filter((product) => product.category === category);
}

function filterByMaxPrice(products, maxPrice) {
    return products.filter((product) => product.price <= maxPrice);
}

function getInStockProducts(products) {
    return products.filter((product) => product.inStock);
}

function findProductById(products, productId) {
    return products.find((product) => product.id === productId);
}

function searchProducts(products, searchText) {
    return products.filter((product) => product.name.toUpperCase().includes(searchText.toUpperCase()));
}

function productSummary(product) {
    const stockMessage = product.inStock ? "In stock" : "Out of stock";
    return `
            ID: ${product.id}. Name: ${product.name}. Category: ${product.category}. Price: ${product.price}. 
            ${stockMessage}
            `
}

function buildProductListElement(products) {
    const listElement = document.createElement('ul');
    for (const product of products) {
        const element = document.createElement('li');
        element.textContent = productSummary(product)
        listElement.append(element);
    }
    return listElement;
}

function buildElementWithHeader(element, title) {
    const resultElement = document.createElement('div');
    
    const headerElement = document.createElement('h2');
    headerElement.textContent = title;
    resultElement.append(headerElement);
    
    resultElement.append(element);
    return resultElement;
}

const productList = document.querySelector('#product-list');
productList.replaceChildren(buildProductListElement(products));

const resultsArea = document.querySelector('#results-area');

const filterCategoryForm = document.querySelector('#filter-category-form');
const filterCategoryInput = document.querySelector('#filter-category-input');
filterCategoryForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const filteredProducts = filterByCategory(products, filterCategoryInput.value);
    const resultElement = buildElementWithHeader(
        buildProductListElement(filteredProducts), 
        `Products with Category ${filterCategoryInput.value}`
    );
    resultsArea.replaceChildren(resultElement);
});

const filterMaxPriceForm = document.querySelector('#filter-max-price-form');
const filterMaxPriceInput = document.querySelector('#filter-max-price-input');
filterMaxPriceForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const filteredProducts = filterByMaxPrice(products, Number(filterMaxPriceInput.value));
    const resultElement = buildElementWithHeader(
        buildProductListElement(filteredProducts),
        `Products with Max Price ${filterMaxPriceInput.value}`
    );
    resultsArea.replaceChildren(resultElement);
});

const findProductForm = document.querySelector('#find-product-form');
const findProductIdInput = document.querySelector('#find-product-id-input');
findProductForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const id = Number(findProductIdInput.value);
    const foundProduct = findProductById(products, id);
    const productElement = document.createElement('p');
    productElement.textContent = `Product with ID ${id} does not exist`;
    if (foundProduct !== undefined) {
        productElement.textContent = productSummary(foundProduct);
    }
    resultsArea.replaceChildren(buildElementWithHeader(productElement, 'ID Search'));
});

const searchProductForm = document.querySelector('#search-product-form');
const searchProductInput = document.querySelector('#search-product-input');
searchProductForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const searchText = searchProductInput.value;
    const foundProducts = searchProducts(products, searchText);
    const resultElement = buildElementWithHeader(
        buildProductListElement(foundProducts),
        `Search for ${searchText}`
    )
    resultsArea.replaceChildren(resultElement);
});

const getStockButton = document.querySelector('#get-stock-button');
getStockButton.addEventListener('click', (event) => {
    const inStockProducts = getInStockProducts(products);
    const resultElement = buildElementWithHeader(
        buildProductListElement(inStockProducts),
        `Products in stock`
    );
    resultsArea.replaceChildren(resultElement);
});