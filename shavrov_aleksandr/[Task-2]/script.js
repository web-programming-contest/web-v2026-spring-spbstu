function isBalanced(str) {
  const stack = [];
  const openBrackets = new Set(['(', '[', '{']);
  const closingMap = {
    ')': '(',
    ']': '[',
    '}': '{'
  };

  for (const char of str) {
    if (openBrackets.has(char)) {
      stack.push(char);
    } else if (char in closingMap) {
      if (stack.length === 0 || stack[stack.length - 1] !== closingMap[char]) {
        return false;
      }
      stack.pop();
    }
  }

  return stack.length === 0;
}

function checkBalance() {
  const str = document.getElementById('inputStr').value;
  const result = isBalanced(str);
  const resultEl = document.getElementById('result');

  resultEl.style.display = 'block';
  resultEl.className = `result ${result}`;
  resultEl.textContent = `"${str}" → ${result}`;
}
