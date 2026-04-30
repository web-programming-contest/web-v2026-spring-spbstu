import { useState, useEffect, useCallback, useRef } from 'react';
import './App.css';
import { booksData } from './data/books';
import Header from './components/Header';
import BookList from './components/BookList';

/**
 * Основной компонент приложения.
 * Хранит состояние сортировки и рабочий массив книг (с добавленным _originalIndex).
 */
function App() {
  // Создаём один раз массив книг с исходным порядком (добавляем _originalIndex).
  // Чтобы не мутировать исходный booksData, делаем копию.
  const [books] = useState(() =>
    booksData.map((book, index) => ({
      ...book,
      _originalIndex: index,
    }))
  );

  // Состояние сортировки: field и direction
  const [sortState, setSortState] = useState({
    field: null,
    direction: null,
  });

  // Функция для циклического переключения сортировки
  const handleSortChange = useCallback((field) => {
    setSortState(prev => {
      if (prev.field === field) {
        // Цикл: asc → desc → сброс
        if (prev.direction === 'asc') {
          return { field, direction: 'desc' };
        } else if (prev.direction === 'desc') {
          return { field: null, direction: null };
        }
      }
      // Новое поле — начинаем с asc
      return { field, direction: 'asc' };
    });
  }, []);

  // Сброс сортировки (например, по Escape)
  const resetSort = useCallback(() => {
    setSortState({ field: null, direction: null });
  }, []);

  // Обработчик клавиши Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && (sortState.field !== null)) {
        resetSort();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [sortState.field, resetSort]);

  return (
    <>
      <Header
        sortField={sortState.field}
        sortDirection={sortState.direction}
        onSortChange={handleSortChange}
      />
      <main className="main">
        <BookList
          books={books}
          sortState={sortState}
        />
      </main>
    </>
  );
}

export default App;