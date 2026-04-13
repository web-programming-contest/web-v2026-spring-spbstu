const carsJson = JSON.parse(localStorage.getItem('cars') || '[]');

let cars;

try {
    cars = carsJson.map(c => {
        const car = new Car(c.make, c.model);
        car.owners = c.owners || [];
        return car;
    });
} catch (e) {
    console.error("Storage corrupted:", e);
    localStorage.clear();
    cars = [];
}

renderCars();

console.log(groupCarsByMake(cars));
console.log(getAllOwners(cars));
console.log(groupCarsByOwnerCount(cars));
console.log(getCarsWithOwner(cars, "Alex"));
console.log(getModelsByMake(cars, "BMW"));

function renderCars() {
    const container = document.querySelector('.cars');
    container.innerHTML = '';

    cars.forEach((car, index) => {
        const div = document.createElement('div');
        div.classList.add('car');
        div.dataset.index = index;

        div.innerHTML = `
            <p>Make: ${car.make}</p>
            <p>Model: ${car.model}</p>
            <p>Owners: ${car.owners.join(', ')}</p>

            <div>
                <input type="text" placeholder="Owner name">
                <button class="add-owner-btn">Add Owner</button>
            </div>

            <div>
                <input type="text" placeholder="Owner name">
                <button class="delete-owner-btn">Delete Owner</button>
            </div>

            <button class="delete-car-btn">Delete Car</button>
        `;

        container.appendChild(div);
    });
}

function addCar(make, model) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                const car = new Car(make, model);
                cars = [...cars, car];
                localStorage.setItem('cars', JSON.stringify(cars));
                resolve();
            } catch (e) {
                reject(e);
            }
        }, 1000);
    });
}

function deleteCar(index) {
    return new Promise(resolve => {
        setTimeout(() => {
            cars.splice(index, 1);
            localStorage.setItem('cars', JSON.stringify(cars));
            resolve();
        }, 1000);
    });
}

function addOwner(index, name) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                cars[index].addOwner(name);
                localStorage.setItem('cars', JSON.stringify(cars));
                resolve();
            } catch (e) {
                reject(e);
            }
        }, 1000);
    });
}

function deleteOwner(index, name) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                cars[index].removeOwner(name);
                localStorage.setItem('cars', JSON.stringify(cars));
                resolve();
            } catch (e) {
                reject(e);
            }
        }, 1000);
    });
}

document.getElementById('addCar').addEventListener('click', (e) => {
    e.target.disabled = true;

    const makeInput = document.getElementById('carMake');
    const modelInput = document.getElementById('carModel');

    const make = makeInput.value;
    const model = modelInput.value;

    makeInput.value = '';
    modelInput.value = '';

    addCar(make, model)
        .then(renderCars)
        .catch(err => console.error(err))
        .finally(() => e.target.disabled = false);
});

document.querySelector('.cars').addEventListener('click', (e) => {
    const carDiv = e.target.closest('.car');
    if (!carDiv) return;

    const index = Number(carDiv.dataset.index);

    if (e.target.matches('.delete-car-btn')) {
        deleteCar(index).then(renderCars);
    }

    if (e.target.matches('.add-owner-btn') || e.target.matches('.delete-owner-btn')) {
        const input = e.target.parentElement.querySelector('input');
        const name = input.value;

        input.value = '';

        if (e.target.matches('.add-owner-btn')) {
            addOwner(index, name).then(renderCars).catch(console.error);
        } else {
            deleteOwner(index, name).then(renderCars).catch(console.error);
        }
    }
});