async function fetchAndRenderFeaturedProducts() {
    try {
        const response = await fetch('http://localhost:3000/products');
        if (!response.ok) {
            throw new Error('Failed to fetch featured products');
        }
        const products = await response.json();
        renderFeaturedProducts(products);
    }
    catch (error) {
        console.error('Error fetching featured products:', error);
    }
}
async function fetchAndRenderNewCollections() {
    try {
        const response = await fetch('http://localhost:3000/newCollections');
        if (!response.ok) {
            throw new Error('Failed to fetch new collections');
        }
        const collections = await response.json();
        renderNewCollections(collections);
    }
    catch (error) {
        console.error('Error fetching new collections:', error);
    }
}
function renderFeaturedProducts(items) {
    const productGrid = document.querySelector('.product-grid');
    productGrid.innerHTML = items.map(item => `
        <div class="product-card">
            <img src="${item.image}" alt="${item.name}">
            <p>${item.name}</p>
        </div>
    `).join('');
}
function renderNewCollections(items) {
    const collectionGrid = document.querySelector('.collection-grid');
    collectionGrid.innerHTML = items.map(item => `
        <div class="collection-item">
            <img src="${item.image}" alt="${item.name}">
            <p>${item.name}</p>
        </div>
    `).join('');
}
const heroHeading = "FEEL YOUR STRENGTH";
const heroDescription = "Join our strength community and unlock your training potential.";
const heroButtonText = "SHOP NOW";
const heroButtonLink = "#";
const heroBackgroundImage = "img/ngang.jpg";
function renderHeroSection() {
    const heroSection = document.querySelector('.hero');
    heroSection.style.backgroundImage = `url(${heroBackgroundImage})`;
    heroSection.innerHTML = `
        <div class="hero-content">
            <h2>${heroHeading}</h2>
            <p>${heroDescription}</p>
            <a href="${heroButtonLink}" class="shop-btn">${heroButtonText}</a>
        </div>
    `;
}
document.addEventListener('DOMContentLoaded', () => {
    fetchAndRenderFeaturedProducts();
    fetchAndRenderNewCollections();
    renderHeroSection();
});
