class Car {
  constructor(make, model, owners = []) {
    this.id = Date.now() + Math.random();
    this.make = make;
    this.model = model;
    this.owners = [...owners];
  }

  addOwner(name) {
    if (!name || this.owners.includes(name)) return;
    this.owners.push(name);
  }

  removeOwner(name) {
    this.owners = this.owners.filter(o => o !== name);
  }

  get ownerCount() {
    return this.owners.length;
  }
}

function groupByMake(cars) {
  return cars.reduce((acc, car) => {
    if (!acc[car.make]) acc[car.make] = [];
    acc[car.make].push(car);
    return acc;
  }, {});
}

function getUniqueOwners(cars) {
  const all = cars.flatMap(car => car.owners);
  return [...new Set(all)];
}

function groupByOwnerCount(cars) {
  return cars.reduce((acc, car) => {
    const count = car.ownerCount;
    if (!acc[count]) acc[count] = [];
    acc[count].push(car);
    return acc;
  }, {});
}

function getCarsByOwner(cars, name) {
  return cars.filter(car => car.owners.includes(name));
}

function getModelsByMake(cars, make) {
  return cars.filter(car => car.make === make).map(car => car.model);
}

const STORAGE_KEY = 'lab4_cars';

let cars = loadCars();

function loadCars() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return getInitialCars();
    const data = JSON.parse(raw);
    return data.map(d => new Car(d.make, d.model, d.owners));
  } catch {
    return getInitialCars();
  }
}

function saveCars() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(
    cars.map(c => ({ id: c.id, make: c.make, model: c.model, owners: c.owners }))
  ));
}

function getInitialCars() {
  const c1 = new Car('Toyota', 'Camry', ['Иван', 'Мария']);
  const c2 = new Car('BMW', 'X5', ['Алексей']);
  const c3 = new Car('Toyota', 'Corolla', ['Ольга', 'Дмитрий', 'Сергей']);
  const c4 = new Car('Honda', 'Civic', []);
  return [c1, c2, c3, c4];
}

function asyncDelay(ms = 600) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function showLoading() { document.getElementById('loadingOverlay').style.display = 'flex'; }
function hideLoading() { document.getElementById('loadingOverlay').style.display = 'none'; }

function showStatus(msg, type = 'info') {
  const el = document.getElementById('statusMsg');
  el.textContent = msg;
  el.className = `status ${type}`;
  el.style.display = 'block';
  setTimeout(() => { el.style.display = 'none'; }, 3000);
}

async function handleAddCar() {
  const make = document.getElementById('newMake').value.trim();
  const model = document.getElementById('newModel').value.trim();
  if (!make || !model) {
    showStatus('Заполните марку и модель!', 'error');
    return;
  }

  showLoading();
  await asyncDelay();

  const car = new Car(make, model);
  cars.push(car);
  saveCars();
  hideLoading();

  document.getElementById('newMake').value = '';
  document.getElementById('newModel').value = '';

  showStatus(`Автомобиль ${make} ${model} добавлен.`, 'success');
  render();
}

async function handleRemoveCar(carId) {
  showLoading();
  await asyncDelay();

  cars = cars.filter(c => c.id !== carId);
  saveCars();
  hideLoading();

  showStatus('Автомобиль удалён.', 'success');
  render();
}

async function handleAddOwner(carId) {
  const name = prompt('Введите имя нового владельца:');
  if (!name || !name.trim()) return;

  showLoading();
  await asyncDelay();

  const car = cars.find(c => c.id === carId);
  if (car) {
    if (car.owners.includes(name.trim())) {
      hideLoading();
      showStatus(`Владелец "${name.trim()}" уже существует.`, 'error');
      return;
    }
    car.addOwner(name.trim());
    saveCars();
  }

  hideLoading();
  showStatus(`Владелец "${name.trim()}" добавлен.`, 'success');
  render();
}

async function handleRemoveOwner(carId, ownerName) {
  showLoading();
  await asyncDelay();

  const car = cars.find(c => c.id === carId);
  if (car) {
    car.removeOwner(ownerName);
    saveCars();
  }

  hideLoading();
  showStatus(`Владелец "${ownerName}" удалён.`, 'success');
  render();
}

let activeFilters = { make: '', owner: '', ownerCount: '' };

function applyFilters() {
  activeFilters.make = document.getElementById('filterMake').value;
  activeFilters.owner = document.getElementById('filterOwner').value.trim().toLowerCase();
  activeFilters.ownerCount = document.getElementById('filterOwnerCount').value;
  renderCards(getFilteredCars());
}

function resetFilters() {
  activeFilters = { make: '', owner: '', ownerCount: '' };
  document.getElementById('filterMake').value = '';
  document.getElementById('filterOwner').value = '';
  document.getElementById('filterOwnerCount').value = '';
  renderCards(cars);
}

function getFilteredCars() {
  return cars.filter(car => {
    if (activeFilters.make && car.make !== activeFilters.make) return false;
    if (activeFilters.owner && !car.owners.some(o => o.toLowerCase().includes(activeFilters.owner))) return false;
    if (activeFilters.ownerCount) {
      if (activeFilters.ownerCount === '3+') {
        if (car.ownerCount < 3) return false;
      } else {
        if (car.ownerCount !== Number(activeFilters.ownerCount)) return false;
      }
    }
    return true;
  });
}

function updateMakeFilter() {
  const sel = document.getElementById('filterMake');
  const current = sel.value;
  const makes = [...new Set(cars.map(c => c.make))].sort();
  sel.innerHTML = '<option value="">Все марки</option>';
  makes.forEach(m => {
    const opt = document.createElement('option');
    opt.value = m;
    opt.textContent = m;
    if (m === current) opt.selected = true;
    sel.appendChild(opt);
  });
}

function renderCards(list) {
  const container = document.getElementById('cardsContainer');
  container.innerHTML = '';

  if (list.length === 0) {
    container.innerHTML = '<div class="no-cars">Автомобили не найдены</div>';
    return;
  }

  for (const car of list) {
    const card = document.createElement('div');
    card.className = 'car-card';

    const ownerItems = car.owners.map(o =>
      `<li>
        <span>${o}</span>
        <button class="btn-remove-owner" onclick="handleRemoveOwner(${car.id}, '${o.replace(/'/g, "\\'")}')">✕</button>
      </li>`
    ).join('');

    card.innerHTML = `
      <h3>${car.make}</h3>
      <div class="car-model">${car.model}</div>
      <div class="owner-count">Владельцев: ${car.ownerCount}</div>
      <ul class="owners-list">
        ${ownerItems || '<li style="color:#aaa;font-style:italic">Нет владельцев</li>'}
      </ul>
      <div class="card-actions">
        <button class="btn-owner" onclick="handleAddOwner(${car.id})">+ Владелец</button>
        <button class="btn-remove" onclick="handleRemoveCar(${car.id})">Удалить авто</button>
      </div>
    `;
    container.appendChild(card);
  }
}

function render() {
  updateMakeFilter();
  renderCards(getFilteredCars());
}

render();
