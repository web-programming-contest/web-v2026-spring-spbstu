document.addEventListener('DOMContentLoaded', function() {

    // Получаем ссылки на элементы DOM по их идентификаторам
    const arrayInput = document.getElementById('array-input');         // Поле ввода
    const errorDiv = document.getElementById('error-message');         // Блок для вывода ошибок
    const inputSpan = document.getElementById('input-array');          // Спан для исходного массива
    const resultSpan = document.getElementById('result-array');        // Спан для результата
    const processBtn = document.getElementById('process-btn');         // Кнопка обработки

    // Исходный массив по умолчанию (пример)
    const defaultArray = [1, 2, 2, 5, 6, 7, 5];
    // Преобразуем массив в строку вида "1, 2, 2, 5, 6, 7, 5" и устанавливаем как значение поля ввода
    arrayInput.value = defaultArray.join(', ');

    /**
     * Функция обновления отображения исходного массива и сброса результата
     * @param {Array} parsedArray - успешно распарсенный массив чисел
     */
    function updateDisplay(parsedArray) {
        // Преобразуем массив в JSON-строку (например, "[1,2,5,6,7]") и вставляем в span
        inputSpan.textContent = JSON.stringify(parsedArray);
        // Очищаем поле с результатом (ещё не нажата кнопка)
        resultSpan.textContent = '';
    }

    /**
     * Функция парсинга строки в массив чисел с полной валидацией
     * @param {string} str - строка из поля ввода
     * @returns {number[]} - массив чисел
     * @throws {Error} - при любой ошибке валидации
     */
    function parseArrayString(str) {
        // Убираем пробелы в начале и конце строки
        const trimmed = str.trim();

        // Если строка пустая — ошибка
        if (trimmed === '') {
            throw new Error('Поле ввода не должно быть пустым.');
        }

        // Проверяем, что строка состоит ТОЛЬКО из цифр, запятых и пробелов
        // Регулярное выражение: ^ — начало строки, [0-9,\s]+ — цифры, запятые, пробелы (один или более раз), $ — конец строки
        if (!/^[0-9,\s]+$/.test(trimmed)) {
            throw new Error('Недопустимые символы. Используйте только цифры, запятые и пробелы.');
        }

        // Разбиваем строку по запятым и убираем пробелы вокруг каждого элемента
        const parts = trimmed.split(',').map(part => part.trim());

        // Проверяем, нет ли пустых элементов (например, если были две запятые подряд ",,")
        if (parts.some(part => part === '')) {
            throw new Error('Обнаружены пустые элементы (лишние запятые).');
        }

        // Преобразуем каждую часть в число
        const numbers = [];
        for (let part of parts) {
            const num = Number(part);               // Пытаемся привести к числу
            // Проверяем, что результат — конечное число (не NaN, не Infinity)
            if (isNaN(num) || !isFinite(num)) {
                throw new Error(`Некорректное число: "${part}"`);
            }
            numbers.push(num);                      // Добавляем число в массив
        }

        // Возвращаем готовый массив чисел
        return numbers;
    }

    /**
     * Функция удаления дубликатов из массива
     * @param {Array} arr - исходный массив
     * @returns {Array} - новый массив без дубликатов
     */
    function removeDuplicates(arr) {
        // new Set(arr) — создаёт Set с уникальными элементами
        // ... (spread) — разворачивает Set в новый массив
        return [...new Set(arr)];
    }

    /**
     * Общая функция обработки ввода: валидация + отображение исходного массива
     * Опционально вычисляет и отображает результат удаления дубликатов.
     * @param {boolean} shouldCalculateResult - если true, то вычислить и показать результат
     */
    function processInput(shouldCalculateResult = false) {
        try {
            // Пытаемся распарсить текущее значение поля
            const parsed = parseArrayString(arrayInput.value);
            // Если успешно — очищаем сообщение об ошибке
            errorDiv.textContent = '';
            // Обновляем отображение исходного массива
            updateDisplay(parsed);
            // Если требуется вычислить результат (нажата кнопка)
            if (shouldCalculateResult) {
                // Получаем уникальные значения
                const unique = removeDuplicates(parsed);
                // Выводим результат в соответствующий span
                resultSpan.textContent = JSON.stringify(unique);
            }
        } catch (e) {
            // При ошибке выводим текст ошибки в специальный блок
            errorDiv.textContent = e.message;
            // Очищаем отображение исходного массива (ставим пустые скобки)
            inputSpan.textContent = '[]';
            // Очищаем результат
            resultSpan.textContent = '';
        }
    }

    // Обработчик события 'input' на поле ввода (срабатывает при каждом изменении текста)
    arrayInput.addEventListener('input', () => processInput(false));
    // Обработчик клика по кнопке "Удалить дубликаты"
    processBtn.addEventListener('click', () => processInput(true));

    // Инициализация при загрузке: отображаем дефолтный массив (без результата)
    processInput(false);

});