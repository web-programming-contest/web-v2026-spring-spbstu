function rotateArray(arr, steps) {
    if (!Array.isArray(arr)) {
        throw new TypeError("Первый аргумент должен быть массивом");
    }

    if (!Number.isInteger(steps)) {
        throw new TypeError("Второй аргумент должен быть целым числом");
    }

    const n = arr.length;
    let res = [];
    
    for (let i = 0; i < n; i++) {
        res[(i + steps) % n] = arr[i];
    }
    
    return res;
}

try {
    console.log(rotateArray([1,2,3,4,5,6], "5")); 
} catch (error) {
    console.error(`${error.name}: ${error.message}`);
}

try {
    console.log(rotateArray([1,2,3,4,5,6], 2));
} catch (error) {
    console.error(`${error.name}: ${error.message}`);
}

try {
    console.log(rotateArray("aaa", 5)); 
} catch (error) {
    console.error(`${error.name}: ${error.message}`);
}
