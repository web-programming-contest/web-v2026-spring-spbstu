"use strict";
function isIsogram(str) {
    if (typeof str !== 'string') {
        throw new TypeError(`Ожидалась строка, получено: ${typeof str}`);
    }

    const normalizedStr = str.toLowerCase();
    const seen = new Set();

    for (let char of normalizedStr) {
        if (seen.has(char)) {
           return false;
        }
        seen.add(char);
    }

    return true;
}

function testIsogram(input, num) {
    try {
        const result = isIsogram(input);
        console.log(`${num}. "${input}" : ${result}`);
    } catch (e) {
        console.error(`${num}. "${input}" : [Ошибка: ${e.message}]`);
    }
}

const tests = [
    "Abcdefg",
    "Abc defg",
    "aba",
    "ab a",
    "goOd",
    "goOOOOd",
    "abcabc",
    "",
    "123!@#",
    "1232",
    "привет",
    "приИвет",
    "1223!@#",
    1
];

tests.forEach((test, index) => testIsogram(test, index + 1));