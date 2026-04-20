function mergeArrays(arr1, arr2) {

    if (!Array.isArray(arr1) || !Array.isArray(arr2)) {
        throw new TypeError("Оба аргумента должны быть массивами");
    }

    let setter = new Set();

    //копируем элементы из первого массива в Set
    for (let i = 0; i < arr1.length; i++) {
        setter.add(arr1[i]);
    }
    
    // Добавляем в result те элементы из массива arr2, которых еще нет
    for (let i = 0; i < arr2.length; i++) {
        setter.add(arr2[i]);
    }

    // Превращаем Set в массив с помощью spread оператора
    return [...setter];

}
try {
    console.log(mergeArrays([1, 2, 3], [2, 3, 4]));
    console.log(mergeArrays(['a', 'b', 'c', 'd'], ['d', 'e', 'f']));
    console.log(mergeArrays([1, 2, 3], [4, 5, 6]));
    console.log(mergeArrays([], []));
    console.log(mergeArrays([1, 2], 5));
}
catch (error) {
    console.log("Ошибка:", error.message);
}


// Несколько примеров работы spread оператора
console.log("\nПример работы spread-оператора");
const str = "Hello";
console.log([...str]); // ['H', 'e', 'l', 'l', 'o']

const numbers = [10, 20, 30, 40, 50];
console.log(Math.max(...numbers)); // 50