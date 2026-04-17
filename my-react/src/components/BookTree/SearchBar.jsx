// src/components/BookTree/SearchBar.jsx - Компонент поиска
import './BookTree.css';

const SearchBar = ({ searchTerm, onSearchChange, onExpandAll, onCollapseAll, onReset }) => {
  return (
    <div className="search-controls">
      <div className="search-bar">
        <input
          type="text"
          placeholder="🔍 Поиск книг, авторов или жанров..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="search-input"
        />
        {searchTerm && (
          <button 
            className="clear-search"
            onClick={() => onSearchChange('')}
          >
            ✕
          </button>
        )}
      </div>
      <div className="control-buttons">
        <button onClick={onExpandAll} className="control-btn expand-all">
          📂 Развернуть всё
        </button>
        <button onClick={onCollapseAll} className="control-btn collapse-all">
          📁 Свернуть всё
        </button>
        <button onClick={onReset} className="control-btn reset">
          🔄 Сбросить
        </button>
      </div>
    </div>
  );
};

export default SearchBar;