function findMaxSubarraySum(arr, n) {
    if (n > arr.length || n <= 0 || !Number.isInteger(n)) {
        return null;
    }

    let currentSum = 0;
    for (let i = 0; i < n; i++) {
        currentSum += arr[i];
    }

    let maxSum = currentSum;
    for (let i = n; i < arr.length; i++) {
        currentSum += arr[i] - arr[i - n];
        maxSum = Math.max(maxSum, currentSum);
    }
    
    return maxSum;
}

let arr = new Array( 1, 5, 3, 2, 1 );
let n = 3;

console.log(findMaxSubarraySum(arr, n));