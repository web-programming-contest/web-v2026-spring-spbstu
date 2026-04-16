function findPairsWithSum(arr, sum) {
  const seen = new Set();
  const pairs = [];

  for (const num of arr) {
    const complement = sum - num;
    if (seen.has(complement)) {
      pairs.push([complement, num]);
    }
    seen.add(num);
  }

  return pairs;
}

function findPairs() {
  const errorEl = document.getElementById('errorMsg');
  errorEl.textContent = '';

  const rawArr = document.getElementById('arrInput').value;
  const sumVal = document.getElementById('sumInput').value;

  const arr = rawArr.split(',').map(s => s.trim()).filter(s => s !== '').map(Number);
  const sum = Number(sumVal);

  if (arr.some(isNaN)) {
    errorEl.textContent = 'Ошибка: массив должен содержать только числа.';
    return;
  }
  if (isNaN(sum)) {
    errorEl.textContent = 'Ошибка: введите числовую сумму.';
    return;
  }

  const pairs = findPairsWithSum(arr, sum);

  const resultBlock = document.getElementById('resultBlock');
  const pairsList = document.getElementById('pairsList');
  const resultTitle = document.getElementById('resultTitle');

  resultBlock.style.display = 'block';
  resultTitle.textContent = `Пары с суммой ${sum} (найдено: ${pairs.length}):`;
  pairsList.innerHTML = '';

  if (pairs.length === 0) {
    pairsList.innerHTML = '<li class="no-pairs">Пары не найдены</li>';
  } else {
    for (const [a, b] of pairs) {
      const li = document.createElement('li');
      li.textContent = `(${a}, ${b})  →  ${a} + ${b} = ${sum}`;
      pairsList.appendChild(li);
    }
  }
}
