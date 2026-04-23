import React, { useState, useMemo } from 'react';
import './BookStore.css'; 
import { books } from './data';

const BookStore = () => {
  const allBooks = useMemo(() => books, []);
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 9;
  const totalPages = Math.ceil(allBooks.length / booksPerPage);

  const currentBooks = useMemo(() => {
    const startIndex = (currentPage - 1) * booksPerPage;
    return allBooks.slice(startIndex, startIndex + booksPerPage);
  }, [currentPage, allBooks]);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  }

  const nextPage = () => goToPage(currentPage + 1);
  const prevPage = () => goToPage(currentPage - 1);

  const getPageNumbers = () => {
    const delta = 2;
    let range = [];
    let rangeWithDots = [];
    let prev;

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || Math.abs(currentPage - i) <= delta) {
        range.push(i);
      }
    }
    
    for (let i of range) {
      if (prev) {
        if (i - prev === 2) {
          rangeWithDots.push(i - 1);
        } else if (i - prev !== 1) {
          rangeWithDots.push('...'); 
        }
      }
      rangeWithDots.push(i);
      prev = i;
    }
    return rangeWithDots;
  }

  return (
    <div className="book-store-container">
      <h1>Каталог книг</h1>
      
      <div className='books-grid'>
        {currentBooks.map((book) => (
          <div key={book.id} className='book-card'>
            <div className='book-cover'>
              <img src={book.cover} alt={book.title} />
            </div>
            <div className='book-info'>
              <h3 className='book-title'>{book.title}</h3>
              <div className='book-rating'>
                <span className='star'>⭐️</span>{book.rating}
              </div>
              <p className='book-description'>{book.description}</p>
              <div className='book-price'>{book.price} ₽</div>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button 
          className="pagination-btn" 
          onClick={prevPage} 
          disabled={currentPage === 1}
        >
          ← Назад
        </button>

        <div className="pagination-numbers">
          {getPageNumbers().map((item, index) => (
            <React.Fragment key={index}>
              {item === '...' ? (
                <span className="pagination-dots">...</span>
              ) : (
                <button
                  className={`pagination-number ${currentPage === item ? 'active' : ''}`}
                  onClick={() => goToPage(item)}
                >
                  {item} 
                </button>
              )}
            </React.Fragment>
          ))}
        </div>

        <button 
          className='pagination-btn'
          onClick={nextPage} 
          disabled={currentPage === totalPages}
        >
          Вперед →
        </button>
      </div>

      <div className="page-info">
        Страница {currentPage} из {totalPages}
      </div>
    </div>
  );
};

export default BookStore;