/**
 * Шапка сайта с логотипом и кнопками сортировки.
 * Принимает текущее поле/направление сортировки и колбэк для изменения.
 */
function Header({ sortField, sortDirection, onSortChange }) {
  // Маппинг для отображения стрелки и класса active
  const getSortClasses = (field) => {
    return `sort-btn${sortField === field && sortDirection ? ' active' : ''}`;
  };

  const getArrow = (field) => {
    if (sortField !== field || !sortDirection) return '';
    return sortDirection === 'asc' ? '↑' : '↓';
  };

  return (
    <header className="header">
      <div className="header-inner">
        <div className="logo">
          <span className="logo-icon">📚</span>
          Книжный магазин
        </div>
        <div className="sort-controls">
          <span className="sort-label">Сортировать по:</span>
          <button
            className={getSortClasses('title')}
            onClick={() => onSortChange('title')}
            aria-label="Сортировать по названию"
          >
            Название
            <span className="sort-arrow">{getArrow('title')}</span>
          </button>
          <button
            className={getSortClasses('price')}
            onClick={() => onSortChange('price')}
            aria-label="Сортировать по цене"
          >
            Цена
            <span className="sort-arrow">{getArrow('price')}</span>
          </button>
          <button
            className={getSortClasses('rating')}
            onClick={() => onSortChange('rating')}
            aria-label="Сортировать по рейтингу"
          >
            Рейтинг
            <span className="sort-arrow">{getArrow('rating')}</span>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;