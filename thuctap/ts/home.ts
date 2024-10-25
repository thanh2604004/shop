interface Item {
    name: string;
    image: string;
}

// Function to fetch and render featured products from API
async function fetchAndRenderFeaturedProducts(): Promise<void> {
    try {
        const response = await fetch('http://localhost:3000/products'); // Đường dẫn tới API của bạn
        if (!response.ok) {
            throw new Error('Failed to fetch featured products');
        }
        const products: Item[] = await response.json();
        renderFeaturedProducts(products); // Gọi hàm để hiển thị sản phẩm
    } catch (error) {
        console.error('Error fetching featured products:', error);
    }
}

// Function to fetch and render new collections from API
async function fetchAndRenderNewCollections(): Promise<void> {
    try {
        const response = await fetch('http://localhost:3000/newCollections'); // Đường dẫn tới API của bạn
        if (!response.ok) {
            throw new Error('Failed to fetch new collections');
        }
        const collections: Item[] = await response.json();
        renderNewCollections(collections); // Gọi hàm để hiển thị bộ sưu tập
    } catch (error) {
        console.error('Error fetching new collections:', error);
    }
}

// Function to render featured products using template strings
function renderFeaturedProducts(items: Item[]): void {
    const productGrid = document.querySelector('.product-grid') as HTMLElement;
    productGrid.innerHTML = items.map(item => `
        <div class="product-card">
            <img src="${item.image}" alt="${item.name}">
            <p>${item.name}</p>
        </div>
    `).join(''); // Sử dụng join để nối các thẻ HTML
}

// Function to render new collections using template strings
function renderNewCollections(items: Item[]): void {
    const collectionGrid = document.querySelector('.collection-grid') as HTMLElement;
    collectionGrid.innerHTML = items.map(item => `
        <div class="collection-item">
            <img src="${item.image}" alt="${item.name}">
            <p>${item.name}</p>
        </div>
    `).join('');
}

// Dữ liệu cho Hero Section
const heroHeading = "FEEL YOUR STRENGTH";
const heroDescription = "Join our strength community and unlock your training potential.";
const heroButtonText = "SHOP NOW";
const heroButtonLink = "#";
const heroBackgroundImage = "img/ngang.jpg";

// Hàm để đổ dữ liệu vào Hero Section
function renderHeroSection() {
    const heroSection = document.querySelector('.hero') as HTMLElement;
    heroSection.style.backgroundImage = `url(${heroBackgroundImage})`;
    heroSection.innerHTML = `
        <div class="hero-content">
            <h2>${heroHeading}</h2>
            <p>${heroDescription}</p>
            <a href="${heroButtonLink}" class="shop-btn">${heroButtonText}</a>
        </div>
    `;
}

// Gọi hàm khi trang được tải
document.addEventListener('DOMContentLoaded', () => {
    fetchAndRenderFeaturedProducts(); // Fetch và hiển thị sản phẩm từ API
    fetchAndRenderNewCollections(); // Fetch và hiển thị bộ sưu tập từ API
    renderHeroSection(); // Hiển thị Hero Section
});
