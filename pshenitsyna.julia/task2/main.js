"use strict"

function maxSize(...arrays){
    try {
        let nArrays = arrays[0].length;
    let size = 0;
    for (let i = 0; i < nArrays; ++i){
        if (arrays[0][i].length>size){
            size = arrays[0][i].length;
        }
    }
    return size;
    } catch (error) {
        console.log(error.message);
    }
    
}

function zipArrays(...arrays){
    try {
        let arr_res = []; 
    let size = maxSize(arrays);
    for (let i = 0; i < size; ++i){
        let arr_temp = [];
        for (let arr of arrays){
            if (arr[i] == undefined) continue;
            arr_temp.push(arr[i]);
        }
        arr_res.push(arr_temp);
    }
    return arr_res;
    } catch (error) {
        console.log(error.message);
    }
    
}

// проверка
let arr1 = [1, 2, 3, 4, 5]; 
let arr2 = ['a', 'b', 'c', 'd', 'e'];
let arr3 = [1, , 4, 7, 8, 9, 0]
// ожидаемый результат: [[1, 'a', 1], [2, 'b'], [3, 'c', 4], [4, 'd', 7], [5, 'e', 8], [9], [0]]
console.log(zipArrays(arr1, arr2, arr3))
console.log(zipArrays(arr1, arr2, undefined))
