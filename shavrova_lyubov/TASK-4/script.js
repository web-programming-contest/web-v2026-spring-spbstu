class Product {
    constructor(id, name, price) {
        this.id = id;
        this.name = name;
        this.categories = [];
        this.price = price;
    }
    
    addCategory(category) {
        if (!this.categories.includes(category)) {
            this.categories.push(category);
        }
    }
    
    removeCategory(category) {
        const index = this.categories.indexOf(category);
        if (index !== -1) {
            this.categories.splice(index, 1);
        }
    }
    
    get categoryCount() {
        return this.categories.length;
    }
}

let products = [];

function loadFromStorage() {
    const saved = localStorage.getItem('products');
    if (saved) {
        const savedProducts = JSON.parse(saved);
        products = savedProducts.map(p => {
            const product = new Product(p.id, p.name, p.price);
            product.categories = p.categories;
            return product;
        });
    } else {
        const product1 = new Product(1, 'Смартфон', 25000);
        product1.addCategory('Электроника');
        product1.addCategory('Телефоны');
        
        const product2 = new Product(2, 'Наушники', 5000);
        product2.addCategory('Электроника');
        product2.addCategory('Аудио');
        
        const product3 = new Product(3, 'Книга', 800);
        product3.addCategory('Книги');
        product3.addCategory('Образование');
        
        products = [product1, product2, product3];
    }
    renderProducts();
}

function saveToStorage() {
    localStorage.setItem('products', JSON.stringify(products));
}

function groupByCategories() {
    const grouped = {};
    
    products.forEach(product => {
        product.categories.forEach(category => {
            if (!grouped[category]) {
                grouped[category] = [];
            }
            grouped[category].push(product);
        });
    });
    
    return grouped;
}

function getUniqueCategories() {
    const categories = new Set();
    products.forEach(product => {
        product.categories.forEach(category => {
            categories.add(category);
        });
    });
    return Array.from(categories);
}

function groupByPriceRanges() {
    const ranges = {
        'до 1000': [],
        '1000 - 5000': [],
        '5000 - 20000': [],
        'более 20000': []
    };
    
    products.forEach(product => {
        if (product.price < 1000) {
            ranges['до 1000'].push(product);
        } else if (product.price >= 1000 && product.price < 5000) {
            ranges['1000 - 5000'].push(product);
        } else if (product.price >= 5000 && product.price <= 20000) {
            ranges['5000 - 20000'].push(product);
        } else {
            ranges['более 20000'].push(product);
        }
    });
    
    return ranges;
}

function getProductsByCategory(category) {
    return products.filter(product => 
        product.categories.includes(category)
    );
}

function getProductsAbovePrice(price) {
    return products.filter(product => product.price > price);
}


function renderProducts() {
    const container = document.getElementById('productsList');
    container.innerHTML = '<h2>Список товаров</h2>';
    
    if (products.length === 0) {
        container.innerHTML += '<p>Нет товаров</p>';
        return;
    }
    
    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <h3 class="product-title">${product.name}</h3>
            <div class="price"> ${product.price} ₽</div>
            <div> Категории: ${product.categories.map(c => `<span class="category">${c}</span>`).join('')}</div>
            <div> Количество категорий: ${product.categoryCount}</div>
            <div> ID: ${product.id}</div>
        `;
        container.appendChild(card);
    });
}

function showByCategories() {
    const grouped = groupByCategories();
    const container = document.getElementById('productsList');
    container.innerHTML = '<h2> Товары по категориям</h2>';
    
    for (const [category, productsList] of Object.entries(grouped)) {
        const section = document.createElement('div');
        section.className = 'group-section';
        section.innerHTML = `
            <h3> ${category}</h3>
            ${productsList.map(p => `<p>• ${p.name} - ${p.price} ₽</p>`).join('')}
        `;
        container.appendChild(section);
    }
}

function showUniqueCategories() {
    const categories = getUniqueCategories();
    const container = document.getElementById('productsList');
    container.innerHTML = '<h2>Уникальные категории</h2>';
    
    const section = document.createElement('div');
    section.className = 'group-section';
    section.innerHTML = `
        <h3>Все категории:</h3>
        ${categories.map(c => `<span class="category">${c}</span>`).join('')}
        <p>Всего: ${categories.length} категорий</p>
    `;
    container.appendChild(section);
}

function showByPriceRanges() {
    const ranges = groupByPriceRanges();
    const container = document.getElementById('productsList');
    container.innerHTML = '<h2>Группировка по ценам</h2>';
    
    for (const [range, productsList] of Object.entries(ranges)) {
        if (productsList.length > 0) {
            const section = document.createElement('div');
            section.className = 'group-section';
            section.innerHTML = `
                <h3>${range}</h3>
                ${productsList.map(p => `<p>• ${p.name} - ${p.price} ₽</p>`).join('')}
            `;
            container.appendChild(section);
        }
    }
}

function filterByPrice() {
    const minPrice = parseInt(document.getElementById('minPrice').value);
    if (isNaN(minPrice)) {
        alert('Введите цену');
        return;
    }
    
    const filtered = getProductsAbovePrice(minPrice);
    const container = document.getElementById('productsList');
    container.innerHTML = `<h2> Товары дороже ${minPrice} ₽</h2>`;
    
    if (filtered.length === 0) {
        container.innerHTML += '<p>Нет товаров дороже указанной цены</p>';
        return;
    }
    
    filtered.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <h3>${product.name}</h3>
            <div class="price"> ${product.price} ₽</div>
            <div> Категории: ${product.categories.map(c => `<span class="category">${c}</span>`).join('')}</div>
        `;
        container.appendChild(card);
    });
}

function addProduct() {
    const id = parseInt(document.getElementById('productId').value);
    const name = document.getElementById('productName').value;
    const price = parseInt(document.getElementById('productPrice').value);
    
    if (!id || !name || !price) {
        alert('Заполните все поля');
        return;
    }
    
    if (products.find(p => p.id === id)) {
        alert('Товар с таким ID уже существует');
        return;
    }
    
    return new Promise((resolve) => {
        setTimeout(() => {
            const product = new Product(id, name, price);
            products.push(product);
            saveToStorage();
            renderProducts();
            clearProductForm();
            resolve(product);
            alert('Товар добавлен!');
        }, 500);
    });
}

function deleteProduct() {
    const id = parseInt(document.getElementById('deleteProductId').value);
    
    if (!id) {
        alert('Введите ID товара');
        return;
    }
    
    return new Promise((resolve) => {
        setTimeout(() => {
            const index = products.findIndex(p => p.id === id);
            if (index !== -1) {
                products.splice(index, 1);
                saveToStorage();
                renderProducts();
                document.getElementById('deleteProductId').value = '';
                resolve(true);
                alert('Товар удалён!');
            } else {
                alert('Товар не найден');
                resolve(false);
            }
        }, 500);
    });
}

function addCategoryToProduct() {
    const productId = parseInt(document.getElementById('categoryProductId').value);
    const category = document.getElementById('categoryName').value;
    
    if (!productId || !category) {
        alert('Заполните все поля');
        return;
    }
    
    return new Promise((resolve) => {
        setTimeout(() => {
            const product = products.find(p => p.id === productId);
            if (product) {
                product.addCategory(category);
                saveToStorage();
                renderProducts();
                clearCategoryForm();
                resolve(true);
                alert('Категория добавлена!');
            } else {
                alert('Товар не найден');
                resolve(false);
            }
        }, 500);
    });
}

function removeCategoryFromProduct() {
    const productId = parseInt(document.getElementById('removeCategoryProductId').value);
    const category = document.getElementById('removeCategoryName').value;
    
    if (!productId || !category) {
        alert('Заполните все поля');
        return;
    }
    
    return new Promise((resolve) => {
        setTimeout(() => {
            const product = products.find(p => p.id === productId);
            if (product) {
                product.removeCategory(category);
                saveToStorage();
                renderProducts();
                document.getElementById('removeCategoryProductId').value = '';
                document.getElementById('removeCategoryName').value = '';
                resolve(true);
                alert('Категория удалена!');
            } else {
                alert('Товар не найден');
                resolve(false);
            }
        }, 500);
    });
}

function clearProductForm() {
    document.getElementById('productId').value = '';
    document.getElementById('productName').value = '';
    document.getElementById('productPrice').value = '';
}

function clearCategoryForm() {
    document.getElementById('categoryProductId').value = '';
    document.getElementById('categoryName').value = '';
}


loadFromStorage();