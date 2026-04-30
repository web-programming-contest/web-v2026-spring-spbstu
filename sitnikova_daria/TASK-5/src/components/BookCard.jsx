import { useState } from 'react';
import StarRating from './StarRating';

/**
 * Карточка одной книги: обложка, информация, кнопка "В корзину".
 * Поддерживает картинку с фолбеком и анимацию задержки.
 */
function BookCard({ book, animationDelay }) {
  // Состояние для кнопки "В корзину" (визуальная обратная связь)
  const [added, setAdded] = useState(false);

  const handleBuyClick = () => {
    if (added) return; // предотвращаем повторное нажатие
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  // Формируем обложку: если есть image — показываем img, иначе фолбек с градиентом
  const gradientStyle = {
    background: `linear-gradient(145deg, ${book.gradient[0]}, ${book.gradient[1]})`
  };

  // Обработчик ошибки загрузки изображения — скрываем img, показываем фолбек
  const handleImgError = (e) => {
    e.target.style.display = 'none';
    const fallback = e.target.parentNode.querySelector('.book-cover-fallback');
    if (fallback) fallback.style.display = 'flex';
  };

  return (
    <div
      className="book-card"
      style={{ animationDelay }}
    >
      <div className="book-cover" style={gradientStyle}>
        {book.image && (
          <img
            src={book.image}
            alt={book.title}
            className="book-cover-img"
            onError={handleImgError}
          />
        )}
        <span
          className="book-cover-fallback"
          style={{ display: book.image ? 'none' : 'flex' }}
        >
          {book.title}
        </span>
      </div>

      <div className="book-info">
        <h3 className="book-title" title={book.title}>
          {book.title}
        </h3>
        <div className="book-rating">
          <StarRating rating={book.rating} />
          <span className="rating-value">{book.rating.toFixed(1)}</span>
        </div>
        <p className="book-description" title={book.description}>
          {book.description}
        </p>
        <div className="book-price">
          {book.price.toLocaleString('ru-RU')} <span className="ruble">₽</span>
        </div>
        <button
          className="buy-btn"
          aria-label={`Купить книгу «${book.title}»`}
          onClick={handleBuyClick}
          style={{
            background: added ? '#2da853' : '',
            pointerEvents: added ? 'none' : '',
          }}
        >
          {added ? '✓ Добавлено!' : '🛒 В корзину'}
        </button>
      </div>
    </div>
  );
}

export default BookCard;