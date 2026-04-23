function groupCarsByMake(cars) {
    let groups = new Map();

    for (let car of cars) {
        if (!groups.has(car.make)) {
            groups.set(car.make, [car.model]);
        } else {
            groups.get(car.make).push(car.model);
        }
    }

    return groups;
}

function getUniqOwners(cars) {
    let owners = new Set();

    for (let car of cars) {
        for (let owner of car.owners) {
            owners.add(owner);
        }
    }

    return Array.from(owners);
}

function groupCarsByOwnerCount(cars) {
    let groups = new Map();

    for (let car of cars) {
        if (!groups.has(car.ownerCount)) {
            groups.set(car.ownerCount, [car.model]);
        } else {
            groups.get(car.ownerCount).push(car.model);
        }
    }

    return groups;
}

function getCarsWithOwner(cars, ownerName) {
    let result = [];

    for (let car of cars) {
        if (car.owners.indexOf(ownerName) !== -1) {
            result.push(car.model);
        }
    }

    return result;
}

function getModelsByMake(cars, make) {
    let result = [];

    for (let car of cars) {
        if (car.make === make) {
            result.push(car.model);
        }
    }

    return result;
}