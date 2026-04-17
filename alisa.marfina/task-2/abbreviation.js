function returnUppercase(str) {
  let result = "";

  for (const char of str) {
    if (char === char.toUpperCase() && char !== char.toLowerCase()) {
      result += char;
    }
  }

  return result;
}

//examples:
console.log(returnUppercase("only lowercase"));
console.log(returnUppercase("JavaScript Object Notation"));
console.log(returnUppercase("Tom's Obvious Minimal Language"));
