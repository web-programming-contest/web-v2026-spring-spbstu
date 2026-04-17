function maxSlidingWindow(arr = [], k) {
    let arrMax = [];

    for (let arrN of arr) {
        if (Array.isArray(arrN) && arrN.length === k) {
            let maxVal = Math.max(...arrN);
            arrMax.push(maxVal);
        }
    }
    return arrMax;
}
//examples:
console.log(maxSlidingWindow([[4, 4, 4, 4], [3, 2, 8, 0], [-1, -350, -33, -15]], 4));
// expected: [4, 8, -1]

console.log(maxSlidingWindow([[5], [10], [-3]], 1));
// expected: [5, 10, -3]

console.log(maxSlidingWindow([[1, 2], [9, 1, 5], [3, 3, 3], [7]], 3));
// expected: [9, 3]