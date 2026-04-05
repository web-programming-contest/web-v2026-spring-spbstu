function sortArrayByParity(arr) {
    const even = [];
    const odd = [];
    for (let num of arr) {
        if (num % 2 === 0) {
            even.push(num);
        } else {
            odd.push(num);
        }
    }
    return even.concat(odd);
}

console.log(sortArrayByParity([3, 1, 2, 4]));
