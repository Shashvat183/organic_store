/**
 * Organic Store Logic
 */

// Product Data with Real Images
const products = [
    {
        id: 1,
        name: "Fresh Organic Avocados",
        category: "Groceries",
        price: 5.99,
        image: "https://images.unsplash.com/photo-1590779033100-9f60a05a013d?auto=format&fit=crop&w=500&q=80", // Fixed Avocados
        stars: 5
    },
    {
        id: 2,
        name: "Cold Pressed Orange Juice",
        category: "Juices",
        price: 4.49,
        image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=500&q=80",
        stars: 4
    },
    {
        id: 3,
        name: "Organic Honey Jar",
        category: "Groceries",
        price: 12.99,
        image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=500&q=80",
        stars: 5
    },
    {
        id: 4,
        name: "Green Detox Juice",
        category: "Juices",
        price: 6.99,
        image: "https://images.unsplash.com/photo-1610970881699-44a5587cabec?auto=format&fit=crop&w=500&q=80",
        stars: 5
    },
    {
        id: 5,
        name: "Whole Wheat Bread",
        category: "Groceries",
        price: 3.50,
        image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=500&q=80",
        stars: 4
    },
    {
        id: 6,
        name: "Almond Milk",
        category: "Groceries",
        price: 4.99,
        image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=500&q=80", // New Reliable Almond Milk
        stars: 5
    },
    {
        id: 7,
        name: "Berry Blast Smoothie",
        category: "Juices",
        price: 7.25,
        image: "https://images.unsplash.com/photo-1638176066666-ffb2f013c7dd?auto=format&fit=crop&w=500&q=80", // Purple Berry Smoothie
        stars: 5
    },
    {
        id: 8,
        name: "Farm Fresh Eggs",
        category: "Groceries",
        price: 8.99,
        image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&w=500&q=80",
        stars: 5
    }
];

// State
let cart = [];
let currentCategory = 'Everything';

// DOM Elements
const productGrid = document.getElementById('product-grid');
const filterTitle = document.getElementById('filter-title');
const sortSelect = document.getElementById('sort-select');
const cartSidebar = document.getElementById('cart-sidebar');
const cartOverlay = document.getElementById('cart-overlay');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalPrice = document.getElementById('cart-total-price');
const cartCountElements = document.querySelectorAll('.cart-count');

// Initial Render
document.addEventListener('DOMContentLoaded', () => {
    renderProducts('Everything');
    setupNavigation();
    setupCartUI();

    // Sort Event
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            renderProducts(currentCategory); // Re-render triggers sort
        });
    }

    // Mobile Menu
    const mobileBtn = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (mobileBtn && navLinks) {
        mobileBtn.addEventListener('click', () => {
            const isFlex = window.getComputedStyle(navLinks).display === 'flex';
            if (isFlex && navLinks.style.display !== 'none') {
                navLinks.style.display = 'none';
            } else {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '80px';
                navLinks.style.left = '0';
                navLinks.style.backgroundColor = 'white';
                navLinks.style.width = '100%';
                navLinks.style.padding = '20px';
                navLinks.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
                navLinks.style.zIndex = '999';
            }
        });
    }
});

// Render Function
function renderProducts(category) {
    productGrid.innerHTML = '';

    currentCategory = category;
    let filtered = category === 'Everything'
        ? [...products]
        : products.filter(p => p.category === category);

    // Sorting
    if (sortSelect) {
        const method = sortSelect.value;
        if (method === 'low-to-high') {
            filtered.sort((a, b) => a.price - b.price);
        } else if (method === 'high-to-low') {
            filtered.sort((a, b) => b.price - a.price);
        }
    }

    if (filterTitle) filterTitle.textContent = category;

    filtered.forEach(product => {
        const starsHTML = '★'.repeat(product.stars) + '☆'.repeat(5 - product.stars);

        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="product-img-box">
                <img src="${product.image}" alt="${product.name}" class="product-img">
                <button class="quick-add-btn" style="position:absolute; bottom:10px; right:10px;" onclick="addToCart(${product.id})">
                    <i data-lucide="plus"></i>
                </button>
            </div>
            <div class="product-meta">
                <span class="product-cat">${product.category}</span>
                <h3 class="product-title">${product.name}</h3>
                <div class="product-stars">${starsHTML}</div>
                <div class="product-price">$${product.price.toFixed(2)}</div>
            </div>
        `;
        productGrid.appendChild(card);
    });

    if (window.lucide) lucide.createIcons();
}

// Cart Logic
window.addToCart = function (id) {
    const product = products.find(p => p.id === id);
    const existing = cart.find(item => item.id === id);

    if (existing) {
        existing.qty++;
    } else {
        cart.push({ ...product, qty: 1 });
    }

    updateCartDisplay();
    openCart();
}

function updateCartDisplay() {
    cartItemsContainer.innerHTML = '';
    let total = 0;
    let count = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p style="text-align:center; color:#999; margin-top:2rem;">Your cart is empty.</p>';
    } else {
        cart.forEach((item, index) => {
            total += item.price * item.qty;
            count += item.qty;

            const itemEl = document.createElement('div');
            itemEl.className = 'cart-item';
            itemEl.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-details">
                    <div class="cart-item-title">${item.name}</div>
                    <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                    <div class="cart-item-qty">
                        <button class="qty-btn" onclick="updateQty(${index}, -1)">-</button>
                        <span>${item.qty}</span>
                        <button class="qty-btn" onclick="updateQty(${index}, 1)">+</button>
                    </div>
                </div>
                <div style="font-weight:600;">$${(item.price * item.qty).toFixed(2)}</div>
            `;
            cartItemsContainer.appendChild(itemEl);
        });
    }

    cartTotalPrice.textContent = '$' + total.toFixed(2);

    // Update Badge
    const badges = document.querySelectorAll('.cart-count');
    badges.forEach(badge => {
        badge.textContent = count;
        // Animation pop
        badge.classList.remove('pop');
        void badge.offsetWidth; // Trigger reflow
        badge.classList.add('pop');
    });
}

window.updateQty = function (index, change) {
    if (cart[index].qty + change <= 0) {
        cart.splice(index, 1);
    } else {
        cart[index].qty += change;
    }
    updateCartDisplay();
}

function setupCartUI() {
    // Open Cart Button (Nav) - Updated selector
    const navCartBtn = document.querySelector('.cart-btn-wrapper');
    if (navCartBtn) {
        navCartBtn.addEventListener('click', openCart);
    }

    // Close Cart
    document.getElementById('close-cart').addEventListener('click', closeCart);
    document.getElementById('cart-overlay').addEventListener('click', closeCart);
}

function openCart() {
    cartSidebar.classList.add('open');
    cartOverlay.classList.add('open');
}

function closeCart() {
    cartSidebar.classList.remove('open');
    cartOverlay.classList.remove('open');
}

// Navigation Logic
function setupNavigation() {
    const navItems = document.querySelectorAll('.nav-links a');

    navItems.forEach(link => {
        link.addEventListener('click', (e) => {
            const text = link.textContent.trim();

            if (['Everything', 'Groceries', 'Juices'].includes(text)) {
                e.preventDefault(); // prevent anchor jump for smooth category swap
                renderProducts(text);
                const grid = document.getElementById('product-grid');
                if (grid) grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            else if (text === 'About') {
                e.preventDefault();
                const section = document.getElementById('about');
                if (section) section.scrollIntoView({ behavior: 'smooth' });
            }
            else if (text === 'Contact') {
                e.preventDefault();
                const section = document.getElementById('contact');
                if (section) section.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    const checkboxes = document.querySelectorAll('.category-list input');
    checkboxes.forEach(box => {
        box.addEventListener('change', (e) => {
            checkboxes.forEach(b => { if (b !== e.target) b.checked = false; });
            const label = e.target.parentElement.textContent.trim();
            let cat = 'Everything';
            if (label.includes('Groceries')) cat = 'Groceries';
            else if (label.includes('Juices')) cat = 'Juices';
            if (e.target.checked) renderProducts(cat);
            else renderProducts('Everything');
        });
    });
}

// Shop Now Button
window.scrollToShop = function () {
    const grid = document.getElementById('product-grid');
    if (grid) grid.scrollIntoView({ behavior: 'smooth' });
}
