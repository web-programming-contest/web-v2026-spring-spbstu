import React, { useState } from 'react';
import '../styles/Rating.css';

const FULL_STAR = '/imgs/full_star.png';
const HALF_STAR = '/imgs/half_star.png';
const EMPTY_STAR = '/imgs/empty_star.png';

/**
 * Компонент для отображения рейтинга звездами
 * @param {number} starCount - количество звезд (по умолчанию 5)
 * @param {number} averageRating - средний рейтинг книги
 * @param {function} onRate - функция, которая вызывается при оценке
 * @param {number|null} tempRating - временная оценка пользователя
 */
function Rating({ starCount = 5, averageRating, onRate, tempRating = null }) {
  const [hoveredStar, setHoveredStar] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  // Нынешний рейтинг
  let currentRating;
  if (tempRating !== null) {
    currentRating = tempRating;
  } else if (hoveredStar > 0) {
    currentRating = hoveredStar;
  } else {
    currentRating = averageRating;
  }

  /**
   * Обработчик клика по звезде
   * @param {number} starNumber - номер звезды (1-5)
   */
  function handleStarClick(starNumber) {
    if (isLocked) return;
    onRate(starNumber);
    
    setIsLocked(true);
    setShowMessage(true);

    setTimeout(() => {
      setIsLocked(false);
      setShowMessage(false);
      setHoveredStar(0);
    }, 3500);
  }

function renderStars() {
  const stars = [];
  const rating = currentRating || 0;
  
  for (let i = 1; i <= starCount; i++) {
    let starSrc = EMPTY_STAR;
    const fullCount = Math.floor(rating);
    const hasFraction = rating % 1 !== 0;
    
    if (i <= fullCount) {
      starSrc = FULL_STAR;
    } else if (i === fullCount + 1 && hasFraction) {
      starSrc = HALF_STAR;
    }
    
    stars.push(
      <img
        key={i}
        src={starSrc}
        alt={starSrc === FULL_STAR ? 'Полная звезда' : starSrc === HALF_STAR ? 'Половина звезды' : 'Пустая звезда'}
        className={`star ${isLocked ? 'locked' : ''}`}
        onClick={() => handleStarClick(i)}
        onMouseEnter={() => !isLocked && setHoveredStar(i)}
        onMouseLeave={() => !isLocked && setHoveredStar(0)}
        style={{
          width: '32px',
          height: '32px',
          objectFit: 'contain',
          cursor: isLocked ? 'default' : 'pointer',
          margin: '0 4px'
        }}
      />
    );
  }
  
  return stars;
}

  return (
    <div className="rating">
      <div>
        {renderStars()}
      </div>
      {showMessage && (
        <div className="rating-message">
          Спасибо за оценку!
        </div>
      )}
    </div>
  );
}

export default Rating;