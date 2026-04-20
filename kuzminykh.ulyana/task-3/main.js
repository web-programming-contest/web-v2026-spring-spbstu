const nonsorted1 = ['a','b','c', 'a']
const nonsorted2 = [0,1,1,1,2,0,1,0,3,7,0,7,3,1,1,1,0,0,4,4];

function sortByFrequency(arr) {
    let countsort = {};
    for (let val of arr){
            countsort[val] = (countsort[val] || 0) + 1;
    }

    let sorted = [];
    for (let key in countsort) {
        sorted.push([key, countsort[key]]);
    }

    for (let i = 0; i < sorted.length; i++) {
        for (let j = 0; j < sorted.length - 1 - i; j++) {
            if (sorted[j][1]<sorted[j + 1][1]) {
                [sorted[j], sorted[j + 1]]=[sorted[j + 1], sorted[j]];
            }
        }
    }   
    
    let result = [];
    for(let val of sorted) {
        for (let i = 0; i< val[1]; i++){
            if (!isNaN(val[0])) {
                result.push(Number(val[0]));
            } else {
                result.push(val[0]);
            }
        }
    }
    return result;
}

console.log(sortByFrequency(nonsorted1))
console.log(sortByFrequency(nonsorted2))