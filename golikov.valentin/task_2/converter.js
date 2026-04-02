function convertBase(num, fromBase, toBase) {

    if (fromBase > 36 || toBase > 36 || fromBase < 2 || toBase < 2) {
        return "Система счисления должна быть в диапазоне [2, 36]";
    }

    let decimalNumber;
    
    if (typeof num === 'string') {
        decimalNumber = parseInt(num, fromBase);
    } else {
        decimalNumber = parseInt(String(num), fromBase);
    }

    //Посколько JS сам может преобразовать данные в строку, проверку на строку можно убрать и расскоментировать код ниже. Программа выдаст идентичные результаты
    //decimalNumber = parseInt(num, fromBase);

    if (isNaN(decimalNumber)) {
        return "Ошибка: неверное число";
    }
        
    let result = decimalNumber.toString(toBase);
    
    return result;
}

console.log('Тест 1 (10: 10 -> 2):', convertBase(10, 10, 2));
console.log('Тест 2 (255: 10 -> 16):', convertBase(255, 10, 16));
console.log('Тест 3 (FF: 16 -> 10):', convertBase('FF', 16, 10));
console.log('Тест 4 (1010: 2 -> 10):', convertBase('1010', 2, 10));
console.log('Тест 5 (777: 8 -> 10):', convertBase('777', 8, 10));
console.log('Тест 6 (A3: 16 -> 2):', convertBase('A3', 16, 2));

//тесты с ошибкой
console.log('Тест 7 (Z: 35 -> 10):', convertBase('Z', 35, 10));
console.log('Тест 8 (Z: 37 -> 10):', convertBase('Z', 37, 10));