async function fetchProducts() {
    try {
        const response = await fetch('http://localhost:3000/allproduct');
        return response.ok ? await response.json() : [];
    }
    catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
}
function createProductCard(item) {
    const discountLabel = item.discount ? `<span class="discount">-${item.discount}%</span>` : '';
    return `
        <div class="product-card">
            <img src="${item.image}" alt="${item.name}">
            <p>${item.name}</p>
            <p>$${item.price} ${discountLabel}</p>
              <button class="buy-now-btn" data-id="${item.id}">Buy Now</button>
        </div>`;
}
function renderProducts(items) {
    const productDisplay = document.querySelector('.product-display');
    productDisplay.innerHTML = items.map(createProductCard).join('');
}
document.addEventListener('DOMContentLoaded', async () => {
    const products = await fetchProducts();
    renderProducts(products);
});
