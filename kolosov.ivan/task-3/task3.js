function findMaxSubarraySum(arr, n) {
    let maxSum = 0;
    let currentSum = 0;
    let curArr;
    for (let i = 0; i < arr.length - n + 1; i++) {
        curArr = arr.slice(i, i + n);   
        currentSum = curArr.reduce(function(a, b) {
             return a + b; 
            }, 0);
        if (currentSum > maxSum) {
            maxSum = currentSum;
        }
    }
    return maxSum;
}

console.log(findMaxSubarraySum([1, 2, 3, 4, 5], 2));
console.log(findMaxSubarraySum([3, 3, 3, 3, 3], 4));
console.log(findMaxSubarraySum([1, 2, 3, 4, 5], 4));