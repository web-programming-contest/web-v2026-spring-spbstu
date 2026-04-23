import React from 'react';

const Pagination = ({ currentPage, totalPages, goToPage }) => {
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
  };

  const nextPage = () => goToPage(currentPage + 1);
  const prevPage = () => goToPage(currentPage - 1);

  return (
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
  );
};

export default Pagination;