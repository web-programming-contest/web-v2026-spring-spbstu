function mergeArrays(arr1, arr2) {
    let result = [];
    
    // Копируем arr1 в result
    for (let i = 0; i < arr1.length; i++) {
        result.push(arr1[i]);
    }
    
    // Добавляем в result те элементы из массива arr2, которых еще нет
    for (let i = 0; i < arr2.length; i++) {
        if (!result.includes(arr2[i])) {
            result.push(arr2[i]);
        }
    }
    
    return result;
}

console.log(mergeArrays([1, 2, 3], [2, 3, 4]));
console.log(mergeArrays(['a', 'b', 'c', 'd'], ['d', 'e', 'f']));
console.log(mergeArrays([1, 2, 3], [4, 5, 6]));
console.log(mergeArrays([], []));