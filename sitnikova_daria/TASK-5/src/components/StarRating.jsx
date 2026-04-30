/**
 * Компонент, отображающий рейтинг в виде звёзд (с поддержкой половинчатых).
 * Рейтинг от 0 до 5.
 */
function StarRating({ rating }) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      // Полная звезда
      stars.push(<span key={i}>★</span>);
    } else if (rating >= i - 0.5) {
      // Полузакрашенная звезда
      stars.push(<span key={i} className="star-half">★</span>);
    } else {
      // Пустая звезда
      stars.push(<span key={i} className="star-empty">★</span>);
    }
  }
  return <span className="stars">{stars}</span>;
}

export default StarRating;