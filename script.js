// ============================================
// LUMÉRA - Luxury Beauty E-Commerce
// Vanilla JavaScript - Production Ready
// ============================================

// ==================== GLOBAL STATE ====================
let products = [
    {
        id: 1,
        name: "Radiance Vitamin C Serum",
        category: "Skincare",
        price: 185,
        rating: 4.9,
        reviews: 2410,
        description: "Brightening serum with 20% Vitamin C",
        image: "https://picsum.photos/id/160/600/600",
        inStock: true
    },
    {
        id: 2,
        name: "Velvet Matte Foundation",
        category: "Makeup",
        price: 95,
        rating: 4.7,
        reviews: 1830,
        description: "Full coverage with a natural finish",
        image: "https://picsum.photos/id/201/600/600",
        inStock: true
    },
    {
        id: 3,
        name: "Golden Glow Face Cream",
        category: "Skincare",
        price: 145,
        rating: 4.8,
        reviews: 1240,
        description: "24K gold infused moisturizer",
        image: "https://picsum.photos/id/251/600/600",
        inStock: true
    },
    {
        id: 4,
        name: "Silk Argan Hair Oil",
        category: "Hair Care",
        price: 68,
        rating: 4.6,
        reviews: 980,
        description: "Nourishing oil for shiny, healthy hair",
        image: "https://picsum.photos/id/292/600/600",
        inStock: true
    },
    {
        id: 5,
        name: "Éclat Eau de Parfum",
        category: "Fragrance",
        price: 220,
        rating: 4.9,
        reviews: 1560,
        description: "Floral woody notes with amber base",
        image: "https://picsum.photos/id/312/600/600",
        inStock: true
    },
    {
        id: 6,
        name: "Cashmere Body Lotion",
        category: "Personal Care",
        price: 65,
        rating: 4.5,
        reviews: 720,
        description: "Ultra-hydrating with shea butter",
        image: "https://picsum.photos/id/133/600/600",
        inStock: true
    },
    {
        id: 7,
        name: "Midnight Repair Eye Cream",
        category: "Skincare",
        price: 125,
        rating: 4.8,
        reviews: 1340,
        description: "Reduces dark circles & fine lines",
        image: "https://picsum.photos/id/180/600/600",
        inStock: true
    },
    {
        id: 8,
        name: "Rose Quartz Blush",
        category: "Makeup",
        price: 78,
        rating: 4.4,
        reviews: 890,
        description: "Creamy blush with natural flush",
        image: "https://picsum.photos/id/1005/600/600",
        inStock: true
    },
    {
        id: 9,
        name: "Luxe Hair Repair Mask",
        category: "Hair Care",
        price: 89,
        rating: 4.7,
        reviews: 650,
        description: "Intensive weekly treatment",
        image: "https://picsum.photos/id/160/600/600",
        inStock: true
    },
    {
        id: 10,
        name: "Amber Oud Parfum",
        category: "Fragrance",
        price: 195,
        rating: 4.9,
        reviews: 1120,
        description: "Warm, sensual, long-lasting scent",
        image: "https://picsum.photos/id/251/600/600",
        inStock: true
    },
    {
        id: 11,
        name: "Luminous Highlighter Stick",
        category: "Makeup",
        price: 58,
        rating: 4.3,
        reviews: 540,
        description: "Buildable glow for face & body",
        image: "https://picsum.photos/id/201/600/600",
        inStock: true
    },
    {
        id: 12,
        name: "Hydra-Plump Lip Treatment",
        category: "Personal Care",
        price: 42,
        rating: 4.6,
        reviews: 2100,
        description: "Plumping & nourishing lip balm",
        image: "https://picsum.photos/id/312/600/600",
        inStock: true
    }
];

let cart = JSON.parse(localStorage.getItem('lumera_cart')) || [];
let wishlist = JSON.parse(localStorage.getItem('lumera_wishlist')) || [];
let currentFilter = 'all';
let currentSort = 'default';

// ==================== LOADING SCREEN ====================
function initLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 600);
    }, 2200);
}

// ==================== NAVBAR BEHAVIOR ====================
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 80) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Active nav link on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Mobile menu
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const navMenu = document.getElementById('nav-menu');
    
    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
            navMenu.style.flexDirection = 'column';
            navMenu.style.position = 'absolute';
            navMenu.style.top = '100%';
            navMenu.style.left = '0';
            navMenu.style.right = '0';
            navMenu.style.background = 'white';
            navMenu.style.padding = '20px';
            navMenu.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
        });
    }
}

// ==================== SEARCH FUNCTIONALITY ====================
function initSearch() {
    const searchBtn = document.getElementById('search-btn');
    const searchOverlay = document.getElementById('search-overlay');
    const searchInput = document.getElementById('search-input');
    const searchClose = document.getElementById('search-close');
    const searchResults = document.getElementById('search-results');
    
    // Open search
    searchBtn.addEventListener('click', () => {
        searchOverlay.classList.add('active');
        searchInput.focus();
    });
    
    // Close search
    searchClose.addEventListener('click', () => {
        searchOverlay.classList.remove('active');
        searchResults.innerHTML = '';
    });
    
    // Live search
    searchInput.addEventListener('input', () => {
        const term = searchInput.value.toLowerCase().trim();
        
        if (term.length < 2) {
            searchResults.innerHTML = '';
            return;
        }
        
        const filtered = products.filter(product => 
            product.name.toLowerCase().includes(term) ||
            product.description.toLowerCase().includes(term) ||
            product.category.toLowerCase().includes(term)
        );
        
        renderSearchResults(filtered, searchResults);
    });
    
    // Close on escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {
            searchOverlay.classList.remove('active');
            searchResults.innerHTML = '';
        }
    });
}

function renderSearchResults(filteredProducts, container) {
    container.innerHTML = '';
    
    if (filteredProducts.length === 0) {
        container.innerHTML = `<p style="padding: 20px; color: #8A8A8A;">No products found.</p>`;
        return;
    }
    
    filteredProducts.forEach(product => {
        const item = document.createElement('div');
        item.style.cssText = 'display:flex; gap:16px; padding:16px; border-bottom:1px solid #f0e9dc; cursor:pointer;';
        item.innerHTML = `
            <img src="${product.image}" style="width:70px; height:70px; border-radius:12px; object-fit:cover;" alt="${product.name}">
            <div style="flex:1;">
                <div style="font-weight:600; margin-bottom:4px;">${product.name}</div>
                <div style="font-size:13px; color:#8A8A8A;">${product.category} • $${product.price}</div>
                <div style="margin-top:6px; color:#C8A97E; font-size:13px;">View product →</div>
            </div>
        `;
        
        item.addEventListener('click', () => {
            document.getElementById('search-overlay').classList.remove('active');
            document.getElementById('shop').scrollIntoView({ behavior: 'smooth' });
            setTimeout(() => {
                filterProductsBySearch(product.id);
            }, 800);
        });
        
        container.appendChild(item);
    });
}

function filterProductsBySearch(productId) {
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.style.display = card.dataset.id == productId ? 'block' : 'none';
    });
    
    // Reset filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
}

// ==================== CATEGORIES ====================
function renderCategories() {
    const container = document.querySelector('.categories-grid');
    if (!container) return;
    
    const categories = [
        { name: "Skincare", count: "32 products", image: "https://picsum.photos/id/160/600/600" },
        { name: "Makeup", count: "28 products", image: "https://picsum.photos/id/201/600/600" },
        { name: "Hair Care", count: "19 products", image: "https://picsum.photos/id/292/600/600" },
        { name: "Fragrances", count: "14 products", image: "https://picsum.photos/id/312/600/600" },
        { name: "Personal Care", count: "24 products", image: "https://picsum.photos/id/133/600/600" }
    ];
    
    container.innerHTML = '';
    
    categories.forEach(cat => {
        const card = document.createElement('div');
        card.className = 'category-card';
        card.innerHTML = `
            <img src="${cat.image}" alt="${cat.name}">
            <div class="category-overlay">
                <div>
                    <div class="category-name">${cat.name}</div>
                    <div class="category-count">${cat.count}</div>
                </div>
            </div>
        `;
        
        card.addEventListener('click', () => {
            document.getElementById('shop').scrollIntoView({ behavior: 'smooth' });
            setTimeout(() => {
                filterByCategory(cat.name);
            }, 700);
        });
        
        container.appendChild(card);
    });
}

function filterByCategory(category) {
    currentFilter = category;
    
    // Update filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.filter === category) btn.classList.add('active');
    });
    
    renderProducts();
}

// ==================== PRODUCTS ====================
function renderProducts(filteredProducts = null) {
    const container = document.getElementById('products-grid');
    if (!container) return;
    
    let toRender = filteredProducts || products;
    
    // Apply current filter
    if (currentFilter !== 'all') {
        toRender = toRender.filter(p => p.category === currentFilter);
    }
    
    // Apply sorting
    if (currentSort === 'price-low') {
        toRender.sort((a, b) => a.price - b.price);
    } else if (currentSort === 'price-high') {
        toRender.sort((a, b) => b.price - a.price);
    } else if (currentSort === 'rating') {
        toRender.sort((a, b) => b.rating - a.rating);
    }
    
    container.innerHTML = '';
    
    toRender.forEach(product => {
        const isWishlisted = wishlist.some(item => item.id === product.id);
        
        const card = document.createElement('div');
        card.className = 'product-card';
        card.dataset.id = product.id;
        card.dataset.category = product.category;
        
        card.innerHTML = `
            <div class="product-image-container">
                <img src="${product.image}" alt="${product.name}" class="product-image">
                
                <div class="product-actions">
                    <button class="wishlist-heart ${isWishlisted ? 'active' : ''}" data-id="${product.id}">
                        <i class="fas fa-heart"></i>
                    </button>
                </div>
            </div>
            
            <div class="product-info">
                <div class="product-category">${product.category}</div>
                <h3 class="product-title">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                
                <div class="product-meta">
                    <div class="product-price">$${product.price}</div>
                    <div class="product-rating">
                        <span class="stars">★★★★★</span>
                        <span class="rating-count">(${product.reviews})</span>
                    </div>
                </div>
                
                <button class="add-to-cart-btn" data-id="${product.id}">
                    Add to Cart
                </button>
            </div>
        `;
        
        // Wishlist button
        const heartBtn = card.querySelector('.wishlist-heart');
        heartBtn.addEventListener('click', (e) => {
            e.stopImmediatePropagation();
            toggleWishlist(product.id, heartBtn);
        });
        
        // Add to cart
        const addBtn = card.querySelector('.add-to-cart-btn');
        addBtn.addEventListener('click', () => {
            addToCart(product.id);
        });
        
        container.appendChild(card);
    });
}

// Filter & Sort
function initFilters() {
    // Category filters
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            currentFilter = btn.dataset.filter;
            renderProducts();
        });
    });
    
    // Sort select
    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) {
        sortSelect.addEventListener('change', () => {
            currentSort = sortSelect.value;
            renderProducts();
        });
    }
}

// ==================== CART SYSTEM ====================
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existing = cart.find(item => item.id === productId);
    
    if (existing) {
        existing.quantity = (existing.quantity || 1) + 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    saveCart();
    updateCartCount();
    showToast(`${product.name} added to cart`);
    
    // Optional: open cart automatically
    // setTimeout(() => showCart(), 800);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartCount();
    renderCart();
}

function changeCartQuantity(productId, newQuantity) {
    const item = cart.find(i => i.id === productId);
    if (!item) return;
    
    if (newQuantity < 1) return;
    
    item.quantity = newQuantity;
    saveCart();
    renderCart();
}

function saveCart() {
    localStorage.setItem('lumera_cart', JSON.stringify(cart));
}

function updateCartCount() {
    const countEl = document.getElementById('cart-count');
    const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    countEl.textContent = totalItems;
}

function showCart() {
    const modal = document.getElementById('cart-modal');
    modal.classList.add('active');
    renderCart();
}

function hideCart() {
    document.getElementById('cart-modal').classList.remove('active');
}

function renderCart() {
    const container = document.getElementById('cart-items');
    const totalEl = document.getElementById('cart-total');
    
    container.innerHTML = '';
    
    if (cart.length === 0) {
        container.innerHTML = `
            <div style="text-align:center; padding:60px 20px; color:#8A8A8A;">
                <i class="fas fa-shopping-bag" style="font-size:48px; margin-bottom:20px; opacity:0.3;"></i>
                <p>Your cart is empty</p>
            </div>
        `;
        totalEl.textContent = '$0';
        return;
    }
    
    let total = 0;
    
    cart.forEach(item => {
        const qty = item.quantity || 1;
        const itemTotal = item.price * qty;
        total += itemTotal;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" class="cart-item-image" alt="${item.name}">
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <div class="cart-item-price">$${item.price}</div>
                
                <div class="cart-item-actions">
                    <div class="quantity-control">
                        <button onclick="changeCartQuantity(${item.id}, ${qty - 1})">-</button>
                        <span>${qty}</span>
                        <button onclick="changeCartQuantity(${item.id}, ${qty + 1})">+</button>
                    </div>
                    <button class="remove-item" onclick="removeFromCart(${item.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
        
        container.appendChild(cartItem);
    });
    
    totalEl.textContent = `$${total}`;
}

// Cart Modal Listeners
function initCartModal() {
    const cartBtn = document.getElementById('cart-btn');
    const closeBtn = document.getElementById('close-cart');
    const modal = document.getElementById('cart-modal');
    const checkoutBtn = document.getElementById('checkout-btn');
    
    cartBtn.addEventListener('click', showCart);
    closeBtn.addEventListener('click', hideCart);
    
    // Close on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) hideCart();
    });
    
    // Checkout
    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) return;
        
        hideCart();
        setTimeout(() => {
            alert("Thank you! Your order has been placed.\n\nIn a real store this would redirect to checkout.");
            cart = [];
            localStorage.removeItem('lumera_cart');
            updateCartCount();
        }, 300);
    });
}

// ==================== WISHLIST ====================
function toggleWishlist(productId, heartElement) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const index = wishlist.findIndex(item => item.id === productId);
    
    if (index > -1) {
        wishlist.splice(index, 1);
        heartElement.classList.remove('active');
    } else {
        wishlist.push(product);
        heartElement.classList.add('active');
        showToast('Added to wishlist');
    }
    
    localStorage.setItem('lumera_wishlist', JSON.stringify(wishlist));
    updateWishlistCount();
}

function updateWishlistCount() {
    const countEl = document.getElementById('wishlist-count');
    countEl.textContent = wishlist.length;
}

function showWishlist() {
    const modal = document.getElementById('wishlist-modal');
    const container = document.getElementById('wishlist-items');
    
    container.innerHTML = '';
    
    if (wishlist.length === 0) {
        container.innerHTML = `<p style="padding:40px; text-align:center; color:#8A8A8A;">Your wishlist is empty</p>`;
    } else {
        wishlist.forEach(product => {
            const item = document.createElement('div');
            item.style.cssText = 'display:flex; gap:16px; padding:16px 0; border-bottom:1px solid #f0e9dc;';
            item.innerHTML = `
                <img src="${product.image}" style="width:80px;height:80px;border-radius:12px;object-fit:cover;" alt="">
                <div style="flex:1;">
                    <h4 style="margin-bottom:4px;">${product.name}</h4>
                    <div style="color:#C8A97E; font-weight:600;">$${product.price}</div>
                    <div style="margin-top:12px; display:flex; gap:10px;">
                        <button onclick="addToCartFromWishlist(${product.id}); document.getElementById('wishlist-modal').classList.remove('active');" 
                                style="padding:8px 20px; background:#2A2A2A; color:white; border:none; border-radius:50px; font-size:13px; cursor:pointer;">
                            Add to Cart
                        </button>
                        <button onclick="removeFromWishlist(${product.id});" 
                                style="padding:8px 16px; background:none; border:1px solid #ccc; border-radius:50px; font-size:13px; cursor:pointer;">
                            Remove
                        </button>
                    </div>
                </div>
            `;
            container.appendChild(item);
        });
    }
    
    modal.classList.add('active');
}

function addToCartFromWishlist(productId) {
    addToCart(productId);
    // Optionally remove from wishlist after adding
}

function removeFromWishlist(productId) {
    wishlist = wishlist.filter(item => item.id !== productId);
    localStorage.setItem('lumera_wishlist', JSON.stringify(wishlist));
    updateWishlistCount();
    showWishlist(); // Refresh modal
}

function initWishlist() {
    const wishlistBtn = document.getElementById('wishlist-btn');
    const closeBtn = document.getElementById('close-wishlist');
    const modal = document.getElementById('wishlist-modal');
    
    wishlistBtn.addEventListener('click', showWishlist);
    closeBtn.addEventListener('click', () => modal.classList.remove('active'));
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('active');
    });
    
    updateWishlistCount();
}

// ==================== BEST SELLERS SPOTLIGHT (already in HTML) ====================

// ==================== COUNTDOWN TIMER ====================
function initCountdown() {
    // Set end date (7 days from now)
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 7);
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = endDate.getTime() - now;
        
        if (distance < 0) {
            document.getElementById('countdown').innerHTML = `<p style="color:#C8A97E;">Offer has ended</p>`;
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        
        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    }
    
    updateCountdown();
    setInterval(updateCountdown, 60000); // Update every minute
}

// ==================== TESTIMONIALS CAROUSEL ====================
function initTestimonials() {
    const testimonials = [
        {
            text: "LUMÉRA completely transformed my skincare routine. The Radiance Serum is nothing short of magical.",
            name: "Isabella Rossi",
            location: "Milan, Italy",
            avatar: "https://picsum.photos/id/1009/80/80"
        },
        {
            text: "The quality and packaging are exceptional. I feel like royalty every time I use their products.",
            name: "Amélie Laurent",
            location: "Paris, France",
            avatar: "https://picsum.photos/id/1011/80/80"
        },
        {
            text: "Finally a brand that delivers on its promises. My skin has never looked better.",
            name: "Sophia Chen",
            location: "New York, USA",
            avatar: "https://picsum.photos/id/1006/80/80"
        }
    ];
    
    const track = document.getElementById('testimonial-track');
    const dotsContainer = document.getElementById('carousel-dots');
    
    // Render testimonials
    track.innerHTML = '';
    testimonials.forEach((t, index) => {
        const slide = document.createElement('div');
        slide.className = 'testimonial-card';
        slide.innerHTML = `
            <div class="testimonial-inner">
                <p class="testimonial-text">"${t.text}"</p>
                <div class="testimonial-author">
                    <img src="${t.avatar}" class="author-avatar" alt="${t.name}">
                    <div class="author-info">
                        <h4>${t.name}</h4>
                        <span>${t.location}</span>
                    </div>
                </div>
            </div>
        `;
        track.appendChild(slide);
    });
    
    // Dots
    dotsContainer.innerHTML = '';
    testimonials.forEach((_, i) => {
        const dot = document.createElement('div');
        dot.className = `dot ${i === 0 ? 'active' : ''}`;
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    });
    
    let currentSlide = 0;
    
    function goToSlide(index) {
        currentSlide = index;
        track.style.transform = `translateX(-${currentSlide * 100}%)`;
        updateDots();
    }
    
    function updateDots() {
        document.querySelectorAll('.dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === currentSlide);
        });
    }
    
    // Auto slide
    setInterval(() => {
        currentSlide = (currentSlide + 1) % testimonials.length;
        track.style.transform = `translateX(-${currentSlide * 100}%)`;
        updateDots();
    }, 5000);
    
    // Manual controls
    document.getElementById('prev-testimonial').addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + testimonials.length) % testimonials.length;
        track.style.transform = `translateX(-${currentSlide * 100}%)`;
        updateDots();
    });
    
    document.getElementById('next-testimonial').addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % testimonials.length;
        track.style.transform = `translateX(-${currentSlide * 100}%)`;
        updateDots();
    });
}

// ==================== ANIMATED COUNTERS ====================
function initCounters() {
    const counters = document.querySelectorAll('.about-stats .stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                counters.forEach(counter => {
                    const target = parseInt(counter.dataset.target);
                    animateCounter(counter, target);
                });
                observer.disconnect();
            }
        });
    }, { threshold: 0.6 });
    
    const aboutSection = document.getElementById('about');
    if (aboutSection) observer.observe(aboutSection);
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 80;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target.toLocaleString();
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toLocaleString();
        }
    }, 30);
}

// ==================== NEWSLETTER ====================
function initNewsletter() {
    const form = document.getElementById('newsletter-form');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = document.getElementById('newsletter-email').value;
        const btn = form.querySelector('button');
        
        btn.innerHTML = `<i class="fas fa-check"></i> <span>Thank you!</span>`;
        btn.style.background = '#4ade80';
        
        setTimeout(() => {
            showToast(`Thank you! Welcome to the LUMÉRA circle.`);
            form.reset();
            btn.innerHTML = `<span>Subscribe</span>`;
            btn.style.background = '';
        }, 2200);
    });
}

// ==================== TOAST NOTIFICATION ====================
function showToast(message) {
    const toast = document.getElementById('toast');
    const messageEl = document.getElementById('toast-message');
    
    messageEl.textContent = message;
    toast.style.display = 'flex';
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.style.display = 'none';
        }, 300);
    }, 2800);
}

// ==================== SCROLL ANIMATIONS ====================
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Animate sections
    const sections = document.querySelectorAll('.categories, .shop, .bestsellers, .testimonials, .about, .instagram');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(40px)';
        section.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(section);
    });
}

// ==================== INITIALIZE EVERYTHING ====================
function initializeWebsite() {
    // Core
    initLoadingScreen();
    initNavbar();
    initSearch();
    
    // Content
    renderCategories();
    renderProducts();
    initFilters();
    
    // Cart & Wishlist
    updateCartCount();
    initCartModal();
    initWishlist();
    
    // Features
    initCountdown();
    initTestimonials();
    initCounters();
    initNewsletter();
    
    // Animations
    initScrollAnimations();
    
    // Bonus: Keyboard shortcut for search
    document.addEventListener('keydown', (e) => {
        if (e.key === '/' && document.activeElement.tagName === 'BODY') {
            e.preventDefault();
            document.getElementById('search-btn').click();
        }
    });
    
    // Welcome toast (demo)
    setTimeout(() => {
        // showToast("Welcome to LUMÉRA");
    }, 4500);
    
    console.log('%c[LUMÉRA] Luxury website initialized successfully.', 'color:#C8A97E');
}

// Start the application
document.addEventListener('DOMContentLoaded', initializeWebsite);