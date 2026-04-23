// Реализуйте функцию findEquilibriumIndex(arr),
// которая находит индекс, где сумма левой и правой части массива равна.

function sum(arr) {
    // Возвращает индекс первого элемента правой части

    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i];
    }
    return sum;
}

function findEquilibriumIndex(arr) {
    for (let i = 1; i < arr.length-1; i++) {
        if (sum(arr.slice(0, i)) === sum(arr.slice(i, arr.length))) {
            return i;
        }
    }
    return -1;
}


let testSet = [
    [1, 1, 1, 9, 1, 1, 1, 1, 1, 1, 6],
    [5, 3, 7, 6, 2, 5, 8, 9, 9, 9, 3, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [-1, 5, 7, -7, 4, -8, -2, -4]
];

for (let i = 0; i < testSet.length; i++) {
    console.log(i+1, testSet[i].join(","), findEquilibriumIndex(testSet[i]));
}

