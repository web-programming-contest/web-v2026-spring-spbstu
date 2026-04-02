function TwoSum(arr,sum) {
    const dictionary  = new Set();
    const pairs = new Map();

    for (let number of arr){
        const expected = sum - number;

        if (dictionary.has(expected)){
            if(!pairs.has(number) && (!pairs.has(expected))) {
                pairs.set(expected, number);
            }
        }
        dictionary.add(number);
    }
    return pairs;
}

const tests = [
    [[2, 7, 1, 8, 11, 15], 9,],
    [[-1, -2, -3, -4, -5], -8,],
    [[0, 4, 3, 0], 0,],
    [[1, 9, 1, 9], 10,],
    [[5], 5]
];

tests.forEach(([arr, sum]) => {
    console.log(TwoSum(arr, sum));
})