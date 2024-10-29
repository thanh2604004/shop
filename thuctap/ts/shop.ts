interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
    discount?: number;
    description?: string;
}

async function fetchProducts(): Promise<Product[]> {
    try {
        const response = await fetch('http://localhost:3000/allproduct'); // Đường dẫn tới API
        return response.ok ? await response.json() : [];
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
}

function createProductCard(item: Product): string {
    const discountLabel = item.discount ? `<span class="discount">-${item.discount}%</span>` : '';
    return `
        <div class="product-card">
            <img src="${item.image}" alt="${item.name}">
            <p>${item.name}</p>
            <p>$${item.price} ${discountLabel}</p>
              <button class="buy-now-btn" data-id="${item.id}">Buy Now</button>
        </div>`;
}

// Function to render product cards
function renderProducts(items: Product[]): void {
    const productDisplay = document.querySelector('.product-display') as HTMLElement;
    productDisplay.innerHTML = items.map(createProductCard).join('');
}


// Initial rendering of products
document.addEventListener('DOMContentLoaded', async () => {
    const products = await fetchProducts();
    renderProducts(products);
});
