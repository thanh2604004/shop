interface Item {
    name: string;
    image: string;
}

// Hàm fetch dữ liệu và hiển thị sản phẩm
interface Item {
    name: string;
    image: string;
}

// Hàm fetch dữ liệu và hiển thị sản phẩm nổi bật
async function product(): Promise<void> {
    const products = await fetchData('http://localhost:3000/products');
    createItems(products, '.product-grid', 'product-card'); // Gọi hàm để hiển thị sản phẩm
}

// Hàm fetch dữ liệu và hiển thị bộ sưu tập mới
async function newCollection(): Promise<void> {
    const collections = await fetchData('http://localhost:3000/newCollections');
    createItems(collections, '.collection-grid', 'collection-item'); // Gọi hàm để hiển thị bộ sưu tập
}

// Hàm chung để fetch dữ liệu từ API
async function fetchData(url: string): Promise<Item[]> {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch data');
        return await response.json();
    } catch {
        return []; // Trả về mảng rỗng nếu có lỗi
    }
}

// Hàm render chung cho cả sản phẩm và bộ sưu tập
function createItems(items: Item[], containerSelector: string, itemClass: string): void {
    const container = document.querySelector(containerSelector) as HTMLElement;
    container.innerHTML = items.map(item => `
        <div class="${itemClass}">
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
    product(); // Fetch và hiển thị sản phẩm từ API
    newCollection(); // Fetch và hiển thị bộ sưu tập từ API
    renderHeroSection(); // Hiển thị Hero Section
});
