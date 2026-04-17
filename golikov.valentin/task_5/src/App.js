import React, { useState } from 'react';
import BookCard from './components/BookCard';
import booksData from './books';
import './styles/App.css';

function App() {
  // Состояние для хранения списка книг
  const [books, setBooks] = useState(booksData);
  
  /**
   * Функция для добавления новой оценки к книге
   * @param {number} bookId - ID книги, которую оценили
   * @param {number} newRating - новая оценка (1-5)
   */
  function addRatingToBook(bookId, newRating) {
    const updatedBooks = books.map(book => {
      if (book.id === bookId) {
        const newRatings = [...book.ratings, newRating];
        return {
          ...book,
          ratings: newRatings
        };
      }
      return book;
    });
    
    setBooks(updatedBooks);
  }
  
  let totalRatings = 0;
  for (let i = 0; i < books.length; i++) {
    totalRatings = totalRatings + books[i].ratings.length;
  }
  
  return (
    <div>
      <header className="header">
        <h1>Книжный интернет-магазин</h1>
      </header>
      
      <div className="books-grid">
        {books.map(book => (
          <BookCard 
            key={book.id}
            book={book} 
            onUpdateRating={addRatingToBook}
          />
        ))}
      </div>
      
      <footer className="footer">
        <p>Всего книг: {books.length} | Всего оценок: {totalRatings}</p>
      </footer>
    </div>
  );
}

export default App;