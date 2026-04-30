import BookCard from './BookCard';

/**
 * Сетка книг с результатами сортировки и счётчиком.
 * Принимает полный массив книг и состояние сортировки.
 */
function BookList({ books, sortState }) {
  // Получаем отсортированный массив согласно состоянию
  const getSortedBooks = () => {
    // Копируем, чтобы не мутировать исходный
    const booksCopy = [...books];

    // Если сортировка не активна, возвращаем в исходном порядке
    if (!sortState.field || !sortState.direction) {
      return booksCopy.sort((a, b) => a._originalIndex - b._originalIndex);
    }

    const { field, direction } = sortState;

    return booksCopy.sort((a, b) => {
      let valA, valB;

      switch (field) {
        case 'title':
          valA = a.title.toLowerCase();
          valB = b.title.toLowerCase();
          break;
        case 'price':
          valA = a.price;
          valB = b.price;
          break;
        case 'rating':
          valA = a.rating;
          valB = b.rating;
          break;
        default:
          return 0;
      }

      let comparison;
      if (typeof valA === 'string') {
        comparison = valA.localeCompare(valB, 'ru');
      } else {
        comparison = valA - valB;
      }

      return direction === 'asc' ? comparison : -comparison;
    });
  };

  const sortedBooks = getSortedBooks();

  return (
    <>
      <p className="books-count">
        Показано {sortedBooks.length} книг
        {sortState.field && sortState.direction ? ' (отсортировано)' : ''}
      </p>
      <div className="books-grid">
        {sortedBooks.length === 0 && (
          <div className="no-results">Книги не найдены.</div>
        )}
        {sortedBooks.map((book, index) => (
          <BookCard
            key={book.id}
            book={book}
            animationDelay={`${index * 0.04}s`}
          />
        ))}
      </div>
    </>
  );
}

export default BookList;