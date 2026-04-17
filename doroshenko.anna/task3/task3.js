
function intersection(arr1, arr2)
{
    if(!Array.isArray(arr1) || !Array.isArray(arr2))
    {
        throw new Error("В функцию необходимо передавать массивы")
    }
    let result = [];
    for(let elem of arr1)
    {
        if(arr2.includes(elem)===true && result.includes(elem)===false)
        {
            result.push(elem);
        }
    }
    return result;
}

arr1 = [1, 2, 1, 2, 3, 3, 4, 11, 12, 8, 7]
arr2 = [1, 2, 1, 1, 2, 3, 4, 5, 6, 7, 8]
//arr2 = 3;
try {
  console.log(intersection(arr1, arr2));
} catch (error) {
  console.error(error.message);
} 
