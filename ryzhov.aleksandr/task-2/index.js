// Написать функцию findLongestPalindrome(str),
// которая находит и возвращает самую длинную подстроку-палиндром в переданной строке.

function  findLongestPalindrome(str) {
    // Вспомогательная строка, в которой и будем искать палиндромы.
    // В такой форме четные палиндромы становятся нечетными, а их легче искать.
    let strWork = "|";
    for (let i = 0; i < str.length; i++) {
        strWork += str[i] + "|";
    }

    let n = strWork.length, l = 0, r = 0,
        res = new Array(n).fill(0),
        resOdd = [], resEven = [];

    // Алгоритм Манакера формирует массив с радиусами палиндромов для каждого символа строки.
    // Индекс радиуса есть индекс центрального элемента в исходной строке.
    for (let i = 1; i < n-1; i++) {
        if (l + (r - i) >= 0)
            res[i] = Math.max(0, Math.min(r-i, res[l+(r-i)]));
        else
            res[i] = 0;

        while (strWork[i-res[i]] === strWork[i+res[i]] && i-res[i] >= 0 && i+res[i] < n)
            res[i]++;

        if (i + res[i] > r) {
            l = i - res[i];
            r = i + res[i];
        }
    }

    // Полученный массив содержит в 2 раза + 1 больше элементов, чем исходная строка,
    // а каждый радиус в 2 раза больше действительного радиуса в строке.
    // Делим массив на 2 массива с четными и нечетными палиндромами.
    for (let i = 1; i < n; i+=2)
        resOdd.push(~~(res[i] / 2));
    for (let i = 0; i < n; i+=2)
        resEven.push(~~(res[i] / 2));

    // Получаем длины максимальных четного и нечетного палиндромов, вырезаем палиндромы из строки.
    let maxOdd = Math.max.apply(null, resOdd),
        maxEven = Math.max.apply(null, resEven),
        palOdd = str.slice(resOdd.indexOf(maxOdd) - (maxOdd - 1), resOdd.indexOf(maxOdd) + (maxOdd - 1) + 1),
        palEven = str.slice(resEven.indexOf(maxEven) - 1 - (maxEven - 1), resEven.indexOf(maxEven) - 1 + (maxEven + 1));

    if (palOdd.length > palEven.length)
        return palOdd;
    return palEven;
}

// Демонстрация работы и тестирование
let testSet = [
    "avavaacdsedcfghidhgfcdghdegdcfgzfdzgf",
    "aacdsedcfghidhgfcdghdegdcfgzfdzgf",
    "abcdsedcfghidhgfcdghdegdcfgzfdzgf",
    "abcdsedcfghidhgfcdghdegdcfgzfdzgff",
    "abcdsedcfghidhgfcdghdegdcfgzfdzgfg",
    "abcdsedcfghidhgfcdgdegdcfgzfdzgf",
    "abcdsedcfghidhgfcddegdcfgzfdzgf",
    "abcdsedcfghidhgfcddedcfgzfdzgf",
    "abcdedcfghidhgfcddedcfgzfdzgf",
    "abcdedcfghidhgfcddedcfgzfzgf",
    "abcdedcfghidhgfcddedcfgzfgzgf",
    "abcdedcfghidhgfcddedcfgzzgf",
    "abcdedcfghidhgfcdedcfgzzgf",
    "abcdedcfghihgfcdedcfgzzgf",
    "abcdedcfghiihgfcdedcfgzzgf"]

for (let i = 0; i < testSet.length; i++) {
    console.log(i+1, testSet[i], findLongestPalindrome(testSet[i]));
}

