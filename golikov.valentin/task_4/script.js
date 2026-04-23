class Order {
    constructor(orderId, status = 'новый') {
        this.orderId = orderId;
        this.items = [];
        this.status = status;
    }

    addItem(item) {
        return new Promise((resolve) => {
            setTimeout(() => {
                this.items.push(item);
                resolve();
            }, 300);
        });
    }

    removeItem(name) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const index = this.items.findIndex(item => item.name === name);
                if (index !== -1) {
                    this.items.splice(index, 1);
                }
                resolve();
            }, 300);
        });
    }

    getTotal() {
        let sum = 0;
        for (let i = 0; i < this.items.length; i++) {
            sum += this.items[i].price;
        }
        return sum;
    }
}

// Глобальный массив заказов
let orders = [];

// Группировка заказов по статусу
function groupByStatus(orders) {
    const result = {};
    for (let i = 0; i < orders.length; i++) {
        const status = orders[i].status;
        if (!result[status]) {
            result[status] = [];
        }
        result[status].push(orders[i]);
    }
    return result;
}

// Уникальный список всех товаров (Arrays)
// function getUniqueItems(orders) {
//     const unique = [];
//     for (let i = 0; i < orders.length; i++) {
//         for (let j = 0; j < orders[i].items.length; j++) {
//             const item = orders[i].items[j];
//             let exists = false;
//             for (let k = 0; k < unique.length; k++) {
//                 if (unique[k].name === item.name) {
//                     exists = true;
//                     break;
//                 }
//             }
//             if (!exists) {
//                 unique.push({ name: item.name, price: item.price });
//             }
//         }
//     }
//     return unique;
// }

// Уникальный список всех товаров (Set())
function getUniqueItems(orders) {
    const unique = new Set();
    for (let order of orders) {
        for (let item of order.items) {
            unique.push({name: item.name, price: item.price});
        }
    }
    return [...unique];
}

// Фильтрация заказов по диапазонам суммы
function filterByPriceRange(orders, minPrice = 0, maxPrice = 0) {
    const result = [];
    for (let i = 0; i < orders.length; i++) {
        if (orders[i].getTotal() >= minPrice && orders[i].getTotal() <= maxPrice) {
            result.push(orders[i]);
        }
    }
    return result;
}

// Заказы, содержащие определённый товар
function findOrdersWithItem(orders, itemName) {
    const result = [];
    for (let i = 0; i < orders.length; i++) {
        for (let j = 0; j < orders[i].items.length; j++) {
            if (orders[i].items[j].name.toLowerCase().includes(itemName.toLowerCase())) {
                result.push(orders[i]);
                break;
            }
        }
    }
    return result;
}

// Список заказов по заданному статусу
function filterByStatus(orders, status) {
    if (status === 'all') return orders;
    const result = [];
    for (let i = 0; i < orders.length; i++) {
        if (orders[i].status === status) {
            result.push(orders[i]);
        }
    }
    return result;
}

// Сохранение в localStorage
function saveToStorage() {
    localStorage.setItem('orders', JSON.stringify(orders));
}

// Загрузка из localStorage
function loadFromStorage() {
    const saved = localStorage.getItem('orders');
    if (saved) {
        const savedOrders = JSON.parse(saved);
        orders = [];
        for (let i = 0; i < savedOrders.length; i++) {
            const order = new Order(savedOrders[i].orderId, savedOrders[i].status);
            order.items = savedOrders[i].items;
            orders.push(order);
        }
    } else {
        // Тестовые данные
        const order1 = new Order(1, 'новый');
        order1.items = [{ name: 'Ноутбук', price: 50000 }, { name: 'Мышь', price: 1000 }];
        
        const order2 = new Order(2, 'обрабатывается');
        order2.items = [{ name: 'Клавиатура', price: 3000 }];
        
        const order3 = new Order(3, 'доставлен');
        order3.items = [{ name: 'Наушники', price: 5000 }];
        
        orders = [order1, order2, order3];
        saveToStorage();
    }
}

// Обновление списка заказов в select
function updateOrderSelect() {
    const select = document.getElementById('orderSelect');
    select.innerHTML = '<option value="">Выберите заказ</option>';
    for (let i = 0; i < orders.length; i++) {
        const option = document.createElement('option');
        option.value = orders[i].orderId;
        option.textContent = 'Заказ #' + orders[i].orderId;
        select.appendChild(option);
    }
}

// Отображение заказов
async function renderOrders() {
    const container = document.getElementById('ordersContainer');
    const filterStatus = document.getElementById('filterStatus').value;
    const filterProduct = document.getElementById('filterProduct').value;
    
    const filterMinPriceInput = document.getElementById('filterMinPrice');
    const filterMaxPriceInput = document.getElementById('filterMaxPrice');
    
    let filterMinPrice = filterMinPriceInput ? parseFloat(filterMinPriceInput.value) : 0;
    let filterMaxPrice = filterMaxPriceInput ? parseFloat(filterMaxPriceInput.value) : Infinity;

    if (isNaN(filterMinPrice)) filterMinPrice = 0;
    if (isNaN(filterMaxPrice)) filterMaxPrice = Infinity;
    
    let filtered = filterByStatus(orders, filterStatus);
    
    if (filterProduct) {
        filtered = findOrdersWithItem(filtered, filterProduct);
    }

    if (filterMinPrice > 0 || filterMaxPrice !== Infinity) {
        filtered = filterByPriceRange(filtered, filterMinPrice, filterMaxPrice);
    }
    
    if (filtered.length === 0) {
        container.innerHTML = '<p>Нет заказов</p>';
        return;
    }
    
    container.innerHTML = '';
    const template = document.getElementById('orderCardTemplate');
    
    for (let i = 0; i < filtered.length; i++) {
        const order = filtered[i];
        
        // Клонируем шаблон
        const card = template.content.cloneNode(true);
        
        // Заполняем данные
        card.querySelector('.order-id').textContent = `Заказ #${order.orderId}`;
        
        // Настройка статуса
        const statusSelect = card.querySelector('.status-select');
        statusSelect.value = order.status;
        statusSelect.dataset.id = order.orderId;
        
        // Кнопка удаления
        const deleteBtn = card.querySelector('.delete-order');
        deleteBtn.dataset.id = order.orderId;
        
        // Товары
        const itemsContainer = card.querySelector('.order-items');
        for (let j = 0; j < order.items.length; j++) {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'order-item';
            itemDiv.innerHTML = `
                <span>${order.items[j].name}</span>
                <span>${order.items[j].price} ₽</span>
            `;
            itemsContainer.appendChild(itemDiv);
        }
        
        // Итого
        card.querySelector('.order-total').textContent = `Итого: ${order.getTotal()} ₽`;
        
        container.appendChild(card);
    }
    
    // Обработчики для статусов
    document.querySelectorAll('.status-select').forEach(select => {
        select.removeEventListener('change', handleStatusChange);
        select.addEventListener('change', handleStatusChange);
    });
    
    // Обработчики для удаления
    document.querySelectorAll('.delete-order').forEach(btn => {
        btn.removeEventListener('click', handleDelete);
        btn.addEventListener('click', handleDelete);
    });
}

// Обработчик изменения статуса
async function handleStatusChange(e) {
    const orderId = parseInt(e.target.dataset.id);
    const order = orders.find(o => o.orderId === orderId);
    if (order) {
        order.status = e.target.value;
        saveToStorage();
        await renderOrders();
    }
}

// Обработчик удаления заказа
async function handleDelete(e) {
    const orderId = parseInt(e.target.dataset.id);
    await deleteOrderAsync(orderId);
}

// Асинхронные операции
async function addOrderAsync(orderId, status) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const exists = orders.some(o => o.orderId === orderId);
            if (exists) {
                reject(new Error('Заказ с таким ID уже существует'));
            } else {
                const order = new Order(orderId, status);
                orders.push(order);
                saveToStorage();
                updateOrderSelect();
                resolve(order);
            }
        }, 500);
    });
}

async function deleteOrderAsync(orderId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const index = orders.findIndex(o => o.orderId === orderId);
            if (index !== -1) {
                orders.splice(index, 1);
                saveToStorage();
                updateOrderSelect();
                renderOrders();
            }
            resolve();
        }, 500);
    });
}

async function addProductToOrderAsync(orderId, productName, productPrice) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const order = orders.find(o => o.orderId === orderId);
            if (!order) {
                reject(new Error('Заказ не найден'));
            } else if (!productName || productPrice <= 0) {
                reject(new Error('Некорректные данные товара'));
            } else {
                order.addItem({ name: productName, price: productPrice }).then(() => {
                    saveToStorage();
                    renderOrders();
                    resolve();
                });
            }
        }, 500);
    });
}

async function removeProductFromOrderAsync(orderId, productName) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const order = orders.find(o => o.orderId === orderId);
            if (!order) {
                reject(new Error('Заказ не найден'));
            } else {
                order.removeItem(productName).then(() => {
                    saveToStorage();
                    renderOrders();
                    resolve();
                });
            }
        }, 500);
    });
}

// Инициализация обработчиков событий
function initEventHandlers() {
    document.getElementById('addOrderBtn').addEventListener('click', async () => {
        const orderId = parseInt(document.getElementById('orderId').value);
        const status = document.getElementById('orderStatus').value;
        
        if (!orderId || orderId <= 0) {
            alert('Введите корректный ID заказа');
            return;
        }
        
        try {
            await addOrderAsync(orderId, status);
            document.getElementById('orderId').value = '';
            await renderOrders();
            alert('Заказ успешно добавлен');
        } catch (error) {
            alert(error.message);
        }
    });
    
    document.getElementById('addProductBtn').addEventListener('click', async () => {
        const orderId = parseInt(document.getElementById('orderSelect').value);
        const productName = document.getElementById('productName').value;
        const productPrice = parseFloat(document.getElementById('productPrice').value);
        
        if (!orderId) {
            alert('Выберите заказ');
            return;
        }
        
        if (!productName || !productPrice || productPrice <= 0) {
            alert('Введите корректные данные товара');
            return;
        }
        
        try {
            await addProductToOrderAsync(orderId, productName, productPrice);
            document.getElementById('productName').value = '';
            document.getElementById('productPrice').value = '';
            alert('Товар успешно добавлен');
        } catch (error) {
            alert(error.message);
        }
    });
    
    document.getElementById('removeProductBtn').addEventListener('click', async () => {
        const orderId = parseInt(document.getElementById('orderSelect').value);
        const productName = document.getElementById('productName').value;
        
        if (!orderId) {
            alert('Выберите заказ');
            return;
        }
        
        if (!productName) {
            alert('Введите название товара');
            return;
        }
        
        try {
            await removeProductFromOrderAsync(orderId, productName);
            document.getElementById('productName').value = '';
            alert('Товар успешно удалён');
        } catch (error) {
            alert(error.message);
        }
    });
    
    document.getElementById('filterStatus').addEventListener('change', () => {
        renderOrders();
    });
    
    document.getElementById('filterProduct').addEventListener('input', () => {
        renderOrders();
    });

    document.getElementById('filterMinPrice').addEventListener('input', () => {
        renderOrders();
    });

    document.getElementById('filterMaxPrice').addEventListener('input', () => {
        renderOrders();
    });
}

// Запуск приложения
loadFromStorage();
updateOrderSelect();
initEventHandlers();
renderOrders();