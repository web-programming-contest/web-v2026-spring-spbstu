import React, { useState } from 'react';
import Rating from './Rating';
import '../styles/BookCard.css';

/**
 * Компонент для отображения одной книги
 * @param {object} book - объект с данными книги
 * @param {function} onUpdateRating - функция обновления рейтинга
 */
function BookCard({ book, onUpdateRating }) {
  const [tempRating, setTempRating] = useState(null);
  
  let sum = 0;
  for (let i = 0; i < book.ratings.length; i++) {
    sum = sum + book.ratings[i];
  }
  const averageRating = sum / book.ratings.length;
  
  /**
   * Обработчик оценки от компонента Rating
   * @param {number} userRating - оценка пользователя (1-5)
   */
  function handleRating(userRating) {
    setTempRating(userRating);
    
    onUpdateRating(book.id, userRating);
    
    setTimeout(() => {
      setTempRating(null);
    }, 3500);
  }
  
  // Обработчик ошибки загрузки картинки
  function handleImageError(e) {
    e.target.src = "/imgs/no-cover.webp";
  }
  
  return (
    <div className="book-card">
      <img 
        src={book.cover} 
        alt={book.title}
        className="book-cover"
        onError={handleImageError}
      />
      
      <div className="book-info">
        <h3 className="book-title">{book.title}</h3>
        <div className="book-author">{book.author}</div>
        <div className="book-description">{book.description}</div>
        <div className="book-price">{book.price} ₽</div>
        
        <div className="average-rating">
          Средний рейтинг: {averageRating.toFixed(1)} ★
        </div>
        
        <Rating 
          starCount={5}
          averageRating={averageRating}
          onRate={handleRating}
          tempRating={tempRating}
        />
        
        <div className="rating-count">
          {book.ratings.length} оценок
        </div>
      </div>
    </div>
  );
}

export default BookCard;