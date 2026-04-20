"use strict";
function findEquilibriumIndex(arr) {
    if (!Array.isArray(arr)) {
        throw new TypeError(`Ожидался массив, получено: ${typeof arr}`);
    }
    if (arr.length === 0) {
        throw new Error("Массив пустой");
    }
    if (!arr.every(el => typeof el === 'number')) {
        throw new TypeError("Все элементы массива должны быть числами");
    }

    let totalSum = arr.reduce((sum, num) => sum + num, 0);
    let leftSum = 0;

    for (let i = 0; i < arr.length; i++) {
        let rightSum = totalSum - (leftSum + arr[i]);

        if (leftSum === rightSum) {
            return i;
        }

        leftSum += arr[i];
    }

    return -1;
}

function testEquilibrium(arr) {
    try {
        const index = findEquilibriumIndex(arr);
        console.log(`Массив: [${arr}], индекс: ${index}`);
    } catch (e) {
        console.error(`Массив: [${arr}], ошибка: ${e.message}`);
    }
}

const testArrays = [
    [1, 3, 5, 2, 2],
    [1, 2, 3],
    [2, 0, 0, 0],
    [0, 0, 0, 0],
    [],
    [5],
    [-1, 3, -2, 1],
    ["a", "b", "c"],
    [1, "b", "c"]
];

testArrays.forEach(testEquilibrium);