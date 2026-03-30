function convertToRoman(num) {
  if (!num) return "Вы ввели пустую строку";
  if (num < 1 || num > 3999) return "Число вне диапазона (1-3999)";

  const romanMap = {
    M: 1000, CM: 900, D: 500, CD: 400,
    C: 100, XC: 90, L: 50, XL: 40,
    X: 10, IX: 9, V: 5, IV: 4, I: 1
  };
  
  let result = '';
  
  for (let key in romanMap) {
    while (num >= romanMap[key]) {
      result += key;
      num -= romanMap[key];
    }
  }
  if ( !result ) return "Вы ввели не число";
  return result;
}


console.log(convertToRoman(""));
console.log(convertToRoman("sss"));
console.log(convertToRoman(55));
console.log(convertToRoman(3999));
