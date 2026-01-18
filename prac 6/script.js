const initialData = [
    { "id": "1", "name": "Tablet Pro", "price": 1000, "rating": 3.2, "category": "accessories", "availableCount": 10, "imageUrl": "https://images.unsplash.com/photo-1624823183493-ed5832f48f18", "extraFunctions": ["Wi-Fi", "Water Resistant"] },
    { "id": "2", "name": "Gaming Laptop", "price": 1500, "rating": 4.5, "category": "computers", "availableCount": 5, "imageUrl": "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb", "extraFunctions": ["Fast Charging", "USB-C"] },
    { "id": "3", "name": "Smartphone X", "price": 800, "rating": 2.4, "category": "mobile", "availableCount": 8, "imageUrl": "https://images.unsplash.com/photo-1677838847804-4054143fb91a", "extraFunctions": ["5G", "OLED"] },
    { "id": "4", "name": "Headphones", "price": 200, "rating": 4.8, "category": "audio", "availableCount": 15, "imageUrl": "https://images.unsplash.com/photo-1545127398-14699f92334b", "extraFunctions": ["Bluetooth", "Noise Cancel"] },
    { "id": "5", "name": "4K Monitor", "price": 300, "rating": 4.1, "category": "computers", "availableCount": 7, "imageUrl": "https://images.unsplash.com/photo-1551721434-8b94ddff0e6d", "extraFunctions": ["HDMI", "IPS"] },
    { "id": "6", "name": "Mechanical Keyboard", "price": 120, "rating": 4.9, "category": "accessories", "availableCount": 20, "imageUrl": "https://images.unsplash.com/photo-1587829741301-dc798b91add1", "extraFunctions": ["RGB", "Wireless"] },
    { "id": "7", "name": "Smart Watch", "price": 250, "rating": 3.8, "category": "mobile", "availableCount": 12, "imageUrl": "https://images.unsplash.com/photo-1558002038-1055907df827", "extraFunctions": ["GPS", "Heart Rate"] },
    { "id": "8", "name": "Wireless Mouse", "price": 50, "rating": 4.2, "category": "accessories", "availableCount": 30, "imageUrl": "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7", "extraFunctions": ["Bluetooth", "Ergonomic"] }
];

let itemsData = [...initialData];
let cart = [];

document.addEventListener('DOMContentLoaded', () => {
    loadCartFromStorage();
    syncStockWithCart();
    renderItems(itemsData);
    setupFilters();
    updateCartCounter();

    setTimeout(() => {
        document.querySelector('.loader').classList.add('hide');
    }, 500);
});

function loadCartFromStorage() {
    const savedCart = localStorage.getItem('myShopCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
}

function saveCartToStorage() {
    localStorage.setItem('myShopCart', JSON.stringify(cart));
}

function syncStockWithCart() {
    cart.forEach(cartItem => {
        const product = itemsData.find(p => p.id === cartItem.id);
        if (product) {
            product.availableCount -= cartItem.qty;
            if (product.availableCount < 0) product.availableCount = 0;
        }
    });
}

function addToCart(id) {
    const product = itemsData.find(p => p.id === id);

    if (product && product.availableCount > 0) {
        product.availableCount--;
        
        const existingItem = cart.find(c => c.id === id);
        if (existingItem) {
            existingItem.qty++;
        } else {
            cart.push({ id: id, qty: 1 });
        }

        updateItemUI(id);
        saveCartToStorage();
        updateCartCounter();
        
        if (!document.getElementById('cart-modal').classList.contains('hide')) {
            renderCartModal();
        }
    }
}

function changeCartQty(id, change) {
    const cartItem = cart.find(c => c.id === id);
    const product = itemsData.find(p => p.id === id);

    if (!cartItem || !product) return;

    if (change === 1) {
        if (product.availableCount > 0) {
            product.availableCount--;
            cartItem.qty++;
        } else {
            alert("No more items in stock!");
            return;
        }
    } else if (change === -1) {
        product.availableCount++;
        cartItem.qty--;
        
        if (cartItem.qty <= 0) {
            cart = cart.filter(c => c.id !== id);
        }
    }

    saveCartToStorage();
    updateCartCounter();
    renderCartModal();
    updateItemUI(id);
}

function removeFromCart(id) {
    const cartItem = cart.find(c => c.id === id);
    const product = itemsData.find(p => p.id === id);

    if (cartItem && product) {
        product.availableCount += cartItem.qty;
        cart = cart.filter(c => c.id !== id);
        
        saveCartToStorage();
        updateCartCounter();
        renderCartModal();
        updateItemUI(id);
    }
}

function renderItems(data) {
    const container = document.querySelector('.items');
    container.innerHTML = '';

    data.forEach(item => {
        const div = document.createElement('div');
        div.className = 'item';
        div.setAttribute('data-id', item.id);
        
        const btnClass = item.availableCount === 0 ? 'add-btn disabled' : 'add-btn';
        const btnText = item.availableCount === 0 ? 'Sold Out' : 'Add to Cart';

        div.innerHTML = `
            <div class="item-image" style="--bgURL:url('${item.imageUrl}')"></div>
            <div class="item-title">${item.name}</div>
            <div class="item-desc">High quality ${item.category} item.</div>
            <div class="item-meta">
                <span>⭐ ${item.rating}</span>
                <span>Left: <b id="stock-${item.id}">${item.availableCount}</b></span>
            </div>
            <div class="item-bottom">
                <span class="price">${item.price} USD</span>
                <button id="btn-${item.id}" class="${btnClass}" onclick="addToCart('${item.id}')">${btnText}</button>
            </div>
        `;
        container.appendChild(div);
    });
}

function updateItemUI(id) {
    const product = itemsData.find(p => p.id === id);
    if (!product) return;

    const stockEl = document.getElementById(`stock-${id}`);
    if (stockEl) stockEl.textContent = product.availableCount;

    const btn = document.getElementById(`btn-${id}`);
    if (btn) {
        if (product.availableCount === 0) {
            btn.className = 'add-btn disabled';
            btn.textContent = 'Sold Out';
        } else {
            btn.className = 'add-btn';
            btn.textContent = 'Add to Cart';
        }
    }
}

function renderCartModal() {
    const list = document.querySelector('.cart-items-list');
    list.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
        list.innerHTML = '<p class="empty-msg" style="text-align:center; padding:20px;">Cart is empty</p>';
    } else {
        cart.forEach(c => {
            const product = itemsData.find(p => p.id === c.id);
            if (product) {
                const row = document.createElement('div');
                row.className = 'cart-item-row';
                row.innerHTML = `
                    <div class="cart-item-info">
                        <div class="cart-item-title">${product.name}</div>
                        <div class="cart-item-price">${product.price} USD</div>
                    </div>
                    <div class="cart-controls">
                        <button class="qty-btn" onclick="changeCartQty('${c.id}', -1)">-</button>
                        <span>${c.qty}</span>
                        <button class="qty-btn" onclick="changeCartQty('${c.id}', 1)">+</button>
                        <span class="remove-btn" onclick="removeFromCart('${c.id}')">Delete</span>
                    </div>
                `;
                list.appendChild(row);
                total += product.price * c.qty;
            }
        });
    }
    
    document.getElementById('cart-total-price').textContent = total;
}

function updateCartCounter() {
    const counter = document.getElementById('cart-counter');
    const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
    
    counter.textContent = totalQty;
    if (totalQty > 0) counter.classList.remove('hide');
    else counter.classList.add('hide');
}

function toggleCart() {
    const modal = document.getElementById('cart-modal');
    modal.classList.toggle('hide');
    if (!modal.classList.contains('hide')) {
        renderCartModal();
    }
}

function setupFilters() {
    const categories = [...new Set(itemsData.map(i => i.category))];
    const catSelect = document.getElementById('category-select');
    categories.forEach(cat => {
        const opt = document.createElement('option');
        opt.value = cat; opt.textContent = cat;
        catSelect.appendChild(opt);
    });

    const ratingContainer = document.getElementById('rating-filters-container');
    [1, 2, 3, 4, 5].forEach(r => {
        const label = document.createElement('label');
        label.innerHTML = `<input type="radio" name="rating" value="${r}"> ${r}+ stars`;
        ratingContainer.appendChild(label);
    });

    const funcs = [...new Set(itemsData.flatMap(i => i.extraFunctions))];
    const funcContainer = document.querySelector('.extra-functions-container');
    funcs.forEach(f => {
        const label = document.createElement('label');
        label.innerHTML = `<input type="checkbox" value="${f}"> ${f}`;
        funcContainer.appendChild(label);
    });

    document.getElementById('search-input').addEventListener('input', runFilters);
    document.getElementById('price-min').addEventListener('input', runFilters);
    document.getElementById('price-max').addEventListener('input', runFilters);
    document.getElementById('category-select').addEventListener('change', runFilters);
    ratingContainer.addEventListener('change', runFilters);
    funcContainer.addEventListener('change', runFilters);
}

function runFilters() {
    const search = document.getElementById('search-input').value.toLowerCase();
    const minPrice = parseFloat(document.getElementById('price-min').value) || 0;
    const maxPrice = parseFloat(document.getElementById('price-max').value) || Infinity;
    const category = document.getElementById('category-select').value;
    const minRating = document.querySelector('input[name="rating"]:checked')?.value || 0;
    const checkedFuncs = Array.from(document.querySelectorAll('.extra-functions-container input:checked')).map(cb => cb.value);

    const filtered = itemsData.filter(item => {
        if (!item.name.toLowerCase().includes(search)) return false;
        if (item.price < minPrice || item.price > maxPrice) return false;
        if (category !== 'all' && item.category !== category) return false;
        if (item.rating < minRating) return false;
        if (checkedFuncs.length > 0) {
            if (!checkedFuncs.every(f => item.extraFunctions.includes(f))) return false;
        }
        return true;
    });

    renderItems(filtered);
}

function resetFilters() {
    document.getElementById('search-input').value = '';
    document.getElementById('price-min').value = '';
    document.getElementById('price-max').value = '';
    document.getElementById('category-select').value = 'all';
    
    const ratingInputs = document.querySelectorAll('input[name="rating"]');
    ratingInputs.forEach(r => r.checked = false);
    
    const funcInputs = document.querySelectorAll('.extra-functions-container input');
    funcInputs.forEach(cb => cb.checked = false);

    runFilters();
}