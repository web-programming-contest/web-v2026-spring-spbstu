// ================ Класс Library (пункт 4.1) =================

/**
 * Класс, представляющий библиотеку.
 * Поля:
 *   name  – название библиотеки (строка)
 *   books – массив объектов книг { title, author, year, genre }
 */
class Library {
  constructor(name) {
    this.name = name;       // сохраняем имя библиотеки
    this.books = [];        // создаём массив книнг, изначально книг нет
  }

  /**
   * Добавляет книгу в библиотеку.
   * @param {Object} book – объект с полями title, author, year, genre
   */
  addBook(book) {
    this.books.push(book);   // добавляем книгу в конец массива
  }

  /**
   * Удаляет книгу по названию
   * @param {string} title – название книги для удаления
   * @returns {boolean} true, если книга была удалена, иначе false
   */
  removeBook(title) {
    const index = this.books.findIndex(book => book.title === title);
    if (index !== -1) {
      this.books.splice(index, 1);   // удаляем найденную книгу
      return true;
    }
    return false;                     // книга не найдена
  }

  /**
   * Геттер, возвращающий количество книг в библиотеке.
   */
  get booksCount() {
    return this.books.length;
  }
}

// =============== Вспомогательные функции (пункт 4.2) =================

/**
 * Группирует все книги из всех библиотек по жанру.
 * @param {Library[]} libraries – массив библиотек
 * @returns {Map} ключ – жанр, значение – массив книг этого жанра
 */
function groupBooksByGenre(libraries) {
  const genreMap = new Map();
  for (const lib of libraries) {
    for (const book of lib.books) {
      const genre = book.genre;
      if (!genreMap.has(genre)) {
        genreMap.set(genre, []);          // если жанра ещё нет, создаём массив
      }
      genreMap.get(genre).push(book);     // добавляем книгу в массив этого жанра
    }
  }
  return genreMap;
}

/**
 * Возвращает уникальный список всех авторов из всех библиотек.
 * @param {Library[]} libraries
 * @returns {string[]} массив уникальных имён авторов
 */
function getUniqueAuthors(libraries) {
  const authorsSet = new Set();           // Set автоматически хранит только уникальные значения
  for (const lib of libraries) {
    for (const book of lib.books) {
      authorsSet.add(book.author);
    }
  }
  return Array.from(authorsSet);          // преобразуем Set в массив
}

/**
 * Группирует книги по году издания (возвращает объект, где ключ – год).
 * @param {Library[]} libraries
 * @returns {Object} { year: [book1, book2, ...] }
 */
function groupBooksByYear(libraries) {
  const yearMap = {};
  for (const lib of libraries) {
    for (const book of lib.books) {
      const year = book.year;
      if (!yearMap[year]) {
        yearMap[year] = [];              // создаём массив для этого года
      }
      yearMap[year].push(book);
    }
  }
  return yearMap;
}

/**
 * Возвращает список уникальных годов выпуска.
 * @param {Library[]} libraries
 * @returns {number[]} массив уникальных годов
 */
function getUniqueYears(libraries) {
  const yearsSet = new Set();             // Set автоматически хранит только уникальные значения
  for (const lib of libraries) {
    for (const book of lib.books) {
      yearsSet.add(book.year);
    }
  }
  return Array.from(yearsSet).sort((a, b) => a - b);   // сортируем по возрастанию для удобства
}

/**
 * Возвращает все книги определённого автора.
 * @param {Library[]} libraries
 * @param {string} authorName
 * @returns {Object[]} массив книг
 */
function getBooksByAuthor(libraries, authorName) {
  const result = [];
  for (const lib of libraries) {
    for (const book of lib.books) {
      if (book.author === authorName) {
        result.push(book);               // книга подходит – добавляем
      }
    }
  }
  return result;
}

// ==================== Управление состоянием и интерфейсом ====================

// Глобальный массив библиотек (объекты Library)
let libraries = [];

// Индекс выбранной библиотеки (-1, если ни одна не выбрана)
let selectedLibraryIndex = -1;

// Ключ для localStorage
const STORAGE_KEY = 'libraryAppData';

// ==================== Работа с localStorage ====================

/**
 * Сохраняет текущее состояние библиотек в localStorage.
 * Сериализуем каждую библиотеку как простой объект { name, books }.
 */
function saveToLocalStorage() {
  // Преобразуем массив Library в массив обычных объектов
  const data = libraries.map(lib => ({
    name: lib.name,
    books: lib.books
  }));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

/**
 * Загружает библиотеки из localStorage и возвращает массив экземпляров Library.
 * @returns {Library[]}
 */
function loadFromLocalStorage() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      const parsed = JSON.parse(saved);   // массив объектов { name, books }
      // Восстанавливаем экземпляры Library
      return parsed.map(item => {
        const lib = new Library(item.name);
        // Добавляем все сохранённые книги
        item.books.forEach(book => lib.addBook(book));
        return lib;
      });
    } catch (e) {
      console.error('Ошибка чтения localStorage:', e);
    }
  }
  // Если ничего нет, возвращаем пустой массив
  return [];
}

// ==================== Асинхронные операции с Promise и setTimeout ====================

/**
 * Асинхронно добавляет новую библиотеку.
 * @param {string} name – название библиотеки
 * @returns {Promise<Library>} промис, разрешающийся новой библиотекой
 */
function addLibraryAsync(name) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newLibrary = new Library(name);
      resolve(newLibrary);
    }, 500);  // имитация задержки
  });
}

/**
 * Асинхронно удаляет библиотеку по индексу.
 * @param {number} index – индекс в массиве libraries
 * @returns {Promise<void>}
 */
function deleteLibraryAsync(index) {
  /**
    * Промис лишь имитирует задержку (запрос к серверу),
    * а фактическое удаление выполняется в вызывающем коде после await.
    * Так мы разделяем ответственность: асинхронная часть – ожидание,
    * синхронная – изменение состояния. Если бы удаление было внутри setTimeout,
    * то при реальном API пришлось бы менять и логику, и порядок действий.
  */
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 500);
  });
}

/**
 * Асинхронно добавляет книгу в библиотеку.
 * @param {Library} library – библиотека, в которую добавляем
 * @param {Object} book – объект книги
 * @returns {Promise<void>}
 */
function addBookAsync(library, book) {
  return new Promise((resolve) => {
    setTimeout(() => {
      library.addBook(book);
      resolve();
    }, 500);
  });
}

/**
 * Асинхронно удаляет книгу из библиотеки по названию.
 * @param {Library} library – библиотека, из которой удаляем
 * @param {string} title – название книги
 * @returns {Promise<boolean>} true, если книга удалена
 */
function deleteBookAsync(library, title) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const removed = library.removeBook(title);
      resolve(removed);
    }, 500);
  });
}

// ==================== Функции рендеринга ====================

/**
 * Отрисовывает список библиотек и обновляет состояние выделения.
 */
function renderLibraries() {
  const container = document.getElementById('librariesList');
  container.innerHTML = '';   // очищаем контейнер

  libraries.forEach((lib, index) => {
    // Создаём элемент для каждой библиотеки
    const item = document.createElement('div');
    item.className = 'library-item';
    if (index === selectedLibraryIndex) {
      item.classList.add('selected');   // подсвечиваем выбранную
    }

    // Текст с названием и количеством книг
    item.innerHTML = `
      <span>${lib.name} (${lib.booksCount} книг)</span>
      <button class="delete-lib-btn" data-index="${index}">Удалить</button>
    `;

    // Клик по элементу (кроме кнопки удаления) – выбор библиотеки
    item.addEventListener('click', (event) => {
      // Если клик был по кнопке удаления – не переключаем выделение
      if (event.target.classList.contains('delete-lib-btn')) return;
      selectLibrary(index);
    });

    container.appendChild(item);
  });

  // Навешиваем обработчики на кнопки удаления библиотек
  document.querySelectorAll('.delete-lib-btn').forEach(btn => {
    btn.addEventListener('click', async (event) => {
      event.stopPropagation();  // чтобы не сработал выбор библиотеки
      const index = parseInt(btn.dataset.index, 10);
      await deleteLibraryAsync(index);   // имитация асинхронного удаления
      // Удаляем библиотеку синхронно после разрешения промиса
      libraries.splice(index, 1);
      // Если удалили выбранную библиотеку, сбрасываем выбор
      if (selectedLibraryIndex === index) {
        selectedLibraryIndex = -1;
      } else if (selectedLibraryIndex > index) {
        selectedLibraryIndex--; // корректируем индекс после удаления
      }
      saveToLocalStorage();     // сохраняем изменения
      renderAll();              // перерисовываем всё
    });
  });
}

/**
 * Выбирает библиотеку по индексу и обновляет отображение книг.
 * @param {number} index
 */
function selectLibrary(index) {
  selectedLibraryIndex = index;
  renderAll();   // полная перерисовка
}

/**
 * Отрисовывает карточки книг для выбранной библиотеки.
 */
function renderBooks() {
  const bookSection = document.getElementById('bookSection');
  const booksContainer = document.getElementById('booksContainer');
  const selectedNameSpan = document.getElementById('selectedLibraryName');

  if (selectedLibraryIndex === -1 || !libraries[selectedLibraryIndex]) {
    // Нет выбранной библиотеки – скрываем секцию
    bookSection.style.display = 'none';
    return;
  }

  const library = libraries[selectedLibraryIndex];
  bookSection.style.display = 'block';
  selectedNameSpan.textContent = library.name;

  // Очищаем контейнер и создаём карточки книг
  booksContainer.innerHTML = '';

  library.books.forEach(book => {
    const card = document.createElement('div');
    card.className = 'book-card';
    card.innerHTML = `
      <p><strong>Название:</strong> ${escapeHTML(book.title)}</p>
      <p><strong>Автор:</strong> ${escapeHTML(book.author)}</p>
      <p><strong>Год:</strong> ${book.year}</p>
      <p><strong>Жанр:</strong> ${escapeHTML(book.genre)}</p>
      <button class="delete-btn delete-book-btn" data-title="${escapeHTML(book.title)}">Удалить</button>
    `;
    booksContainer.appendChild(card);
  });

  // Навешиваем обработчики на кнопки удаления книг
  document.querySelectorAll('.delete-book-btn').forEach(btn => {
    btn.addEventListener('click', async (event) => {
      const title = btn.dataset.title;
      const lib = libraries[selectedLibraryIndex];
      // Асинхронное удаление
      await deleteBookAsync(lib, title);
      saveToLocalStorage();
      renderAll();   // обновляем интерфейс
    });
  });
}

/**
 * Вспомогательная функция для защиты от XSS при вставке пользовательских данных.
 * escapeHTML превращает любые символы <, >, & в безопасные HTML-сущности (&lt;, &gt;, &amp;).
 * @param {string} str 
 * @returns {string}
 */
function escapeHTML(str) {
  const div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

/**
 * Полная перерисовка всего интерфейса.
 */
function renderAll() {
  renderLibraries();
  renderBooks();
}

// ==================== Обработчики событий ====================

/**
 * Обработчик кнопки "Добавить библиотеку".
 */
async function handleAddLibrary() {
  const input = document.getElementById('libraryNameInput');
  const name = input.value.trim();
  if (!name) {
    alert('Введите название библиотеки');
    return;
  }
  // Асинхронное добавление (имитация задержки)
  const newLib = await addLibraryAsync(name);
  libraries.push(newLib);
  input.value = '';               // очищаем поле
  saveToLocalStorage();
  renderAll();
}

/**
 * Обработчик кнопки "Добавить книгу".
 */
async function handleAddBook() {
  if (selectedLibraryIndex === -1) {
    alert('Сначала выберите библиотеку');
    return;
  }
  const title = document.getElementById('titleInput').value.trim();
  const author = document.getElementById('authorInput').value.trim();
  const year = parseInt(document.getElementById('yearInput').value, 10);
  const genre = document.getElementById('genreInput').value.trim();

  // Простая валидация
  if (!title || !author || isNaN(year) || !genre) {
    alert('Заполните все поля корректно');
    return;
  }

  const book = { title, author, year, genre };
  const library = libraries[selectedLibraryIndex];
  // Асинхронное добавление
  await addBookAsync(library, book);

  // Очищаем поля формы
  document.getElementById('titleInput').value = '';
  document.getElementById('authorInput').value = '';
  document.getElementById('yearInput').value = '';
  document.getElementById('genreInput').value = '';

  saveToLocalStorage();
  renderAll();
}

// ==================== Функции отображения результатов 4.2 ====================

/**
 * Отображает группировку книг по жанрам в соответствующем контейнере.
 */
function showGroupedByGenre() {
  const container = document.getElementById('genreResult');
  const genreMap = groupBooksByGenre(libraries);
  let html = '';

  if (genreMap.size === 0) {
    html = 'Нет книг ни в одной библиотеке.';
  } else {
    html = '<ul class="genre-list">';
    for (const [genre, books] of genreMap.entries()) {
      html += `<li><strong>${escapeHTML(genre)}</strong> (${books.length} кн.)`;
      html += '<ul class="book-sublist">';
      books.forEach(book => {
        html += `<li>"${escapeHTML(book.title)}" – ${escapeHTML(book.author)} (${book.year})</li>`;
      });
      html += '</ul></li>';
    }
    html += '</ul>';
  }
  container.innerHTML = html;
}

/**
 * Отображает список уникальных авторов.
 */
function showUniqueAuthors() {
  const container = document.getElementById('authorsResult');
  const authors = getUniqueAuthors(libraries);
  if (authors.length === 0) {
    container.innerHTML = 'Нет авторов.';
    return;
  }
  const html = '<ul class="author-list">' +
    authors.map(a => `<li>${escapeHTML(a)}</li>`).join('') +
    '</ul>';
  container.innerHTML = html;
}

/**
 * Отображает группировку книг по годам издания.
 */
function showGroupedByYear() {
  const container = document.getElementById('yearGroupResult');
  const yearGroups = groupBooksByYear(libraries);
  const years = Object.keys(yearGroups).sort((a, b) => a - b);

  if (years.length === 0) {
    container.innerHTML = 'Нет книг.';
    return;
  }

  let html = '<ul class="year-list">';
  for (const year of years) {
    const books = yearGroups[year];
    html += `<li><strong>${year}</strong> (${books.length} кн.)`;
    html += '<ul class="book-sublist">';
    books.forEach(book => {
      html += `<li>"${escapeHTML(book.title)}" – ${escapeHTML(book.author)}</li>`;
    });
    html += '</ul></li>';
  }
  html += '</ul>';
  container.innerHTML = html;
}

/**
 * Отображает список уникальных годов выпуска.
 */
function showUniqueYears() {
  const container = document.getElementById('uniqueYearsResult');
  const uniqueYears = getUniqueYears(libraries);
  if (uniqueYears.length === 0) {
    container.innerHTML = 'Нет данных о годах.';
  } else {
    container.innerHTML = '<ul class="year-list">' +
      uniqueYears.map(y => `<li>${y}</li>`).join('') +
      '</ul>';
  }
}

/**
 * Отображает книги заданного автора (поиск по полю ввода).
 */
function showBooksByAuthor() {
  const input = document.getElementById('authorSearchInput');
  const author = input.value.trim();
  const container = document.getElementById('authorBooksResult');

  if (!author) {
    container.innerHTML = 'Введите имя автора.';
    return;
  }

  const books = getBooksByAuthor(libraries, author);
  if (books.length === 0) {
    container.innerHTML = `Книг автора "${escapeHTML(author)}" не найдено.`;
  } else {
    let html = `<p>Найдено книг: ${books.length}</p><ul class="book-list">`;
    books.forEach(book => {
      html += `<li>"${escapeHTML(book.title)}" (${book.year}, жанр: ${escapeHTML(book.genre)})</li>`;
    });
    html += '</ul>';
    container.innerHTML = html;
  }
}

// ==================== Инициализация приложения ====================

/**
 * Устанавливает все обработчики событий после загрузки DOM.
 */
function setupEventListeners() {
  document.getElementById('addLibraryBtn').addEventListener('click', handleAddLibrary);
  document.getElementById('addBookBtn').addEventListener('click', handleAddBook);
  // Обработчики для функций анализа (4.2)
  document.getElementById('groupByGenreBtn').addEventListener('click', showGroupedByGenre);
  document.getElementById('uniqueAuthorsBtn').addEventListener('click', showUniqueAuthors);
  document.getElementById('groupByYearBtn').addEventListener('click', showGroupedByYear);
  document.getElementById('uniqueYearsBtn').addEventListener('click', showUniqueYears);
  document.getElementById('searchByAuthorBtn').addEventListener('click', showBooksByAuthor);

  document.getElementById('loadDemoBtn').addEventListener('click', loadDemoData);

  // Сохранение при закрытии вкладки (сохранение уже происходит после каждого изменения,
  // но на всякий случай вызовем при beforeunload)
  window.addEventListener('beforeunload', saveToLocalStorage);
}

/**
 * Точка входа.
 */
function init() {
  // Загружаем данные из localStorage
  libraries = loadFromLocalStorage();
  // Устанавливаем обработчики
  setupEventListeners();
  // Первичная отрисовка
  renderAll();
}

/**
 * Загружает небольшой демонстрационный набор библиотек и книг.
 * Каждая библиотека и каждая книга добавляются асинхронно (Promise + setTimeout).
 */
async function loadDemoData() {

  // Демо-библиотека 1
  const lib1 = await addLibraryAsync('Библиотека 1');
  libraries.push(lib1);
  // Добавляем книги в библиотеку 1
  await addBookAsync(lib1, { title: 'Книга 1', author: 'Автор А', year: 2025, genre: 'Жанр 1' });
  await addBookAsync(lib1, { title: 'Книга 2', author: 'Автор Б', year: 2024, genre: 'Жанр 2' });
  await addBookAsync(lib1, { title: 'Книга 3', author: 'Автор А', year: 2025, genre: 'Жанр 1' });

  // Демо-библиотека 2
  const lib2 = await addLibraryAsync('Библиотека 2');
  libraries.push(lib2);
  await addBookAsync(lib2, { title: 'Книга 4', author: 'Автор В', year: 2023, genre: 'Жанр 2' });
  await addBookAsync(lib2, { title: 'Книга 5', author: 'Автор Б', year: 2025, genre: 'Жанр 3' });
  await addBookAsync(lib2, { title: 'Книга 6', author: 'Автор В', year: 2024, genre: 'Жанр 1' });

  // Сохраняем и перерисовываем интерфейс
  saveToLocalStorage();
  renderAll();
}

// Запуск после полной загрузки DOM (defer в теге script тоже это обеспечивает)
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}