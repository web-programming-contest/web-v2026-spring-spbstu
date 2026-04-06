"use strict"

function maxSlidingWindow(arr = [[]], k){
    let arrMax = [];
    for (let arrN of arr){
        if (arrN.length == k){
            let temp = 0;
            for (let i = 0; i < k; ++i){
                temp+=arrN[i];
            }
            arrMax.push(temp);
        }
    }
    return arrMax;
}
 
//проверка
let arr1 = [[1, 2, 3, 4], [3, 5], [2, 4, 6, 8], [1, 2, 3], [9, 9, 9, 9]];
let k = 4;
// ожидаемый результат: [10, 20, 36]
console.log(maxSlidingWindow(arr1, k));
