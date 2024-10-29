async function product() {
    const products = await fetchData('http://localhost:3000/products');
    createItems(products, '.product-grid', 'product-card');
}
async function newCollection() {
    const collections = await fetchData('http://localhost:3000/newCollections');
    createItems(collections, '.collection-grid', 'collection-item');
}
async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok)
            throw new Error('Failed to fetch data');
        return await response.json();
    }
    catch {
        return [];
    }
}
function createItems(items, containerSelector, itemClass) {
    const container = document.querySelector(containerSelector);
    container.innerHTML = items.map(item => `
        <div class="${itemClass}">
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
    product();
    newCollection();
    renderHeroSection();
});
