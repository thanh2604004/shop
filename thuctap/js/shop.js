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
            <button class="buy-btn" data-id="${item.id}">View Details</button>
        </div>`;
}
function renderProducts(items) {
    const productDisplay = document.querySelector('.product-display');
    productDisplay.innerHTML = items.map(createProductCard).join('');
    document.querySelectorAll('.buy-btn').forEach(button => {
        button.addEventListener('click', () => {
            const productId = button.getAttribute('data-id');
            const selectedProduct = items.find(item => item.id === Number(productId));
            if (selectedProduct) {
                localStorage.setItem('selectedProduct', JSON.stringify(selectedProduct));
                window.location.href = 'chitietsanpham.html';
            }
        });
    });
}
function renderProductDetail() {
    const productData = localStorage.getItem('selectedProduct');
    if (!productData) {
        window.location.href = 'shop.html';
        return;
    }
    const product = JSON.parse(productData);
    document.querySelector('.product-detail').innerHTML = `
        <div class="product-images">
            <img src="${product.image}" alt="${product.name}">
        </div>
        <div class="product-info">
            <h1>${product.name}</h1>
            <h2>Price: $${product.price}</h2>
            <p>${product.description || 'No description available.'}</p>
            <button class="buy-btn">Buy Now</button>
            <div class="product-meta">
                <p><strong>SKU:</strong> ${product.id}</p>
                <p><strong>Category:</strong> CLOTHING</p>
            </div>
        </div>`;
}
document.addEventListener('DOMContentLoaded', async () => {
    if (window.location.pathname.includes('chitietsanpham.html')) {
        renderProductDetail();
    }
    else {
        const products = await fetchProducts();
        renderProducts(products);
    }
});
