function findPairsWithSum(arr, sum) {
    let set = new Set();
    let result = [];

    for (let i = 0; i < arr.length; i++) {
        if (set.has(sum - arr[i])) {
            result.push([arr[i], sum - arr[i]]);
        } else {
            set.add(arr[i]);
        }
    }

    return result;
}

function printPairs(pairs) {
    for (let str of pairs) {
        console.log(str);
    }
}

function test3() {
    console.log("1 2 3 4 5 -- 6");
    let result = findPairsWithSum([1, 2, 3, 4, 5], 6);
    printPairs(result);

    console.log("4 1 9 3 5 1 8 -- 9");
    result = findPairsWithSum([4, 1, 9, 3, 5, 1, 8], 9);
    printPairs(result);

    console.log("2 7 11 15 -- 9");
    result = findPairsWithSum([2, 7, 11, 15], 9);
    printPairs(result);

}