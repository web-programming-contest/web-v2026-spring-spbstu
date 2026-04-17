// src/components/BookTree/TreeStats.jsx - Компонент статистики
import './BookTree.css';

const TreeStats = ({ data }) => {
  const calculateStats = () => {
    let authors = data.length;
    let publishers = 0;
    let genres = 0;
    let books = 0;
    
    data.forEach(author => {
      author.publishers.forEach(publisher => {
        publishers++;
        publisher.genres.forEach(genre => {
          genres++;
          books += genre.books.length;
        });
      });
    });
    
    return { authors, publishers, genres, books };
  };
  
  const stats = calculateStats();
  
  return (
    <div className="stats-container">
      <div className="stat-card">
        <div className="stat-icon">✍️</div>
        <div className="stat-info">
          <span className="stat-value">{stats.authors}</span>
          <span className="stat-label">Авторов</span>
        </div>
      </div>
      <div className="stat-card">
        <div className="stat-icon">📚</div>
        <div className="stat-info">
          <span className="stat-value">{stats.publishers}</span>
          <span className="stat-label">Издательств</span>
        </div>
      </div>
      <div className="stat-card">
        <div className="stat-icon">📑</div>
        <div className="stat-info">
          <span className="stat-value">{stats.genres}</span>
          <span className="stat-label">Жанров</span>
        </div>
      </div>
      <div className="stat-card">
        <div className="stat-icon">📖</div>
        <div className="stat-info">
          <span className="stat-value">{stats.books}</span>
          <span className="stat-label">Книг</span>
        </div>
      </div>
    </div>
  );
};

export default TreeStats;