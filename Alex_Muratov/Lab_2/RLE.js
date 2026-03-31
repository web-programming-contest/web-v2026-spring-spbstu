function RLE (input) {
    let count = 1;
    let result = "";

    for( let i = 0; i < input.length; i++ ){
        if ( i !== input.length && input[i] === input[i+1] ){
            count++
        }
        else{
            if (count === 1)
                result+=input[i];
            else {
                result += count + input[i];
                count = 1;
            }
        }
    }
    return result;
}
const test = ["","a","abcde","aaaaa","aabbbccccddddd"]

for (let each of test){
    console.log(RLE(each));
}
