// src/components/BookTree/TreeNode.jsx - Компонент узла дерева
import { useState } from 'react';
import './BookTree.css';

const TreeNode = ({ node, level = 0, searchTerm = '', expandedNodes, onToggle }) => {
  // const [isExpanded, setIsExpanded] = useState(false);
  
  // Определяем тип узла по наличию дочерних элементов
  const nodeType = node.books ? 'book' : 
                   node.genres ? 'genre' : 
                   node.publishers ? 'publisher' : 'author';
  
  const hasChildren = !!(node.publishers || node.genres || node.books);
  const isExpandedState = expandedNodes[node.id] || false;
  
  const handleToggle = () => {
    if (hasChildren) {
      onToggle(node.id, !isExpandedState);
    }
  };
  
  // Подсветка при поиске
  const highlightText = (text) => {
    if (!searchTerm) return text;
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, i) => 
      regex.test(part) ? <mark key={i} className="highlight">{part}</mark> : part
    );
  };
  
  // Проверка соответствия поиску
  const matchesSearch = () => {
    if (!searchTerm) return true;
    const searchLower = searchTerm.toLowerCase();
    
    if (node.name?.toLowerCase().includes(searchLower)) return true;
    
    // Проверка дочерних элементов
    if (node.publishers) {
      return node.publishers.some(pub => 
        pub.name.toLowerCase().includes(searchLower) ||
        pub.genres.some(genre =>
          genre.name.toLowerCase().includes(searchLower) ||
          genre.books.some(book => book.name.toLowerCase().includes(searchLower))
        )
      );
    }
    
    if (node.genres) {
      return node.genres.some(genre =>
        genre.name.toLowerCase().includes(searchLower) ||
        genre.books.some(book => book.name.toLowerCase().includes(searchLower))
      );
    }
    
    if (node.books) {
      return node.books.some(book => book.name.toLowerCase().includes(searchLower));
    }
    
    return false;
  };
  
  if (!matchesSearch()) return null;
  
  return (
    <div className="tree-node">
      <div 
        className={`tree-node-content level-${level} ${nodeType}`}
        style={{ paddingLeft: `${level * 20 + 20}px` }}
      >
        {hasChildren && (
          <button 
            className="toggle-btn"
            onClick={handleToggle}
          >
            {isExpandedState ? '▼' : '▶'}
          </button>
        )}
        {!hasChildren && <span className="toggle-placeholder">•</span>}
        <span className="node-name">{highlightText(node.name)}</span>
        {nodeType === 'book' && <span className="book-badge">📖</span>}
        {nodeType === 'author' && <span className="author-badge">✍️</span>}
        {nodeType === 'publisher' && <span className="publisher-badge">📚</span>}
        {nodeType === 'genre' && <span className="genre-badge">📑</span>}
      </div>
      
      {hasChildren && isExpandedState && (
        <div className="tree-node-children">
          {node.publishers?.map(publisher => (
            <TreeNode
              key={publisher.id}
              node={publisher}
              level={level + 1}
              searchTerm={searchTerm}
              expandedNodes={expandedNodes}
              onToggle={onToggle}
            />
          ))}
          {node.genres?.map(genre => (
            <TreeNode
              key={genre.id}
              node={genre}
              level={level + 1}
              searchTerm={searchTerm}
              expandedNodes={expandedNodes}
              onToggle={onToggle}
            />
          ))}
          {node.books?.map(book => (
            <TreeNode
              key={book.id}
              node={book}
              level={level + 1}
              searchTerm={searchTerm}
              expandedNodes={expandedNodes}
              onToggle={onToggle}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TreeNode;