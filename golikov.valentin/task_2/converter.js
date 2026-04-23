function convertBase(num, fromBase, toBase) {

    // Проверка на число вводимых оснований систем счисления
    if (isNaN(fromBase)) {
        throw new TypeError(`Ошибка в исходной системе счисления, ожидалось число, получено "${fromBase}"`);
    }
    else if (isNaN(toBase)) {
        throw new TypeError(`Ошибка в конечной системе счисления, ожидалось число, получено "${toBase}"`);
    }

    // Проверка диапазона вводимых оснований систем счисления
    if (fromBase > 36 || toBase > 36 || fromBase < 2 || toBase < 2) {
        throw new RangeError("Система счисления должна быть в диапазоне [2, 36]");
    }

    let decimalNumber;

    decimalNumber = parseInt(num, fromBase);

    if (isNaN(decimalNumber)) {
        throw new SyntaxError(`Недопустимый символ "${num}" для системы счисления ${fromBase}`);
    }
        
    let result = decimalNumber.toString(toBase);
    
    return result;
}

const tests = [
    { name: 'Тест 1 (10: 10 -> 2)', fn: () => convertBase(10, 'F', 2) },
    { name: 'Тест 2 (255: 10 -> 16)', fn: () => convertBase(255, 10, 16) },
    { name: 'Тест 3 (FF: 16 -> 8)', fn: () => convertBase('FF', 16, 8) },
    { name: 'Тест 4 (1010: 2 -> 5)', fn: () => convertBase('1010', 2, 5) },
    { name: 'Тест 5 (777: 8 -> 10)', fn: () => convertBase('777', 8, 10) },
    { name: 'Тест 6 (A3: 16 -> 2)', fn: () => convertBase('A3', 16, 2) },
    { name: 'Тест 7 (Z: 35 -> 10)', fn: () => convertBase('Z', 35, 10) },
    { name: 'Тест 8 (Z: 37 -> 10)', fn: () => convertBase('Z', 37, 10) },
];

for (const test of tests) {
    try {
        const result = test.fn();
        console.log(`${test.name}:`, result);
    } catch (error) {
        console.log(`${test.name} упал.`, error.message);
    }
}
