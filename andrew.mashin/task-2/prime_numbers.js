function eratosthenes(n) {
    let tempNumbers = new Set();
    for (let i = 2; i <= n; ++i) {
        for (let j = i * i; j <= n; j += i) {
            tempNumbers.add(j);
        }
    }

    let result = [];
    for (let i = 2; i <= n; ++i) {
        if (!tempNumbers.has(i)) {
            result.push(i);
        }
    }

    return result;
};


let massive = eratosthenes(25);
console.log(massive);