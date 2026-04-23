import React from 'react';

const BookCard = ({ book }) => {
  return (
    <div className='book-card'>
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
  );
};

export default BookCard;