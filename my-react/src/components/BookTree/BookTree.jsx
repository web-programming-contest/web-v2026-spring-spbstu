// src/components/BookTree/BookTree.jsx - Главный компонент дерева
import { useState } from 'react';
import TreeNode from './TreeNode';
import SearchBar from './SearchBar';
import TreeStats from './TreeStats';
import { booksData } from '../../data/booksData';
import './BookTree.css';

const BookTree = () => {
  const [expandedNodes, setExpandedNodes] = useState({}); // Какие узлы развёрнуты
  const [searchTerm, setSearchTerm] = useState(''); // Что ищем
  
   
  // console.log('Тип setExpandedNodes:', typeof setExpandedNodes);
  // // Вывод: "function"
  
  // console.log('Имя функции:', setExpandedNodes.name);
  // // Вывод: "bound dispatchSetState" или что-то подобное
  
   

  const handleToggle = (nodeId, isExpanded) => {
    setExpandedNodes(prev => ({
      ...prev,
      [nodeId]: isExpanded
    }));
  };
  
  const expandAll = () => {
    const allIds = {};
    // console.log('Вызываю setExpandedNodes');
    const collectIds = (nodes) => {
      nodes.forEach(node => {
        allIds[node.id] = true;
        if (node.publishers) {
          node.publishers.forEach(pub => {
            allIds[pub.id] = true;
            if (pub.genres) {
              pub.genres.forEach(genre => {
                allIds[genre.id] = true;
                if (genre.books) {
                  genre.books.forEach(book => {
                    allIds[book.id] = true;
                  });
                }
              });
            }
          });
        }
        if (node.genres) {
          node.genres.forEach(genre => {
            allIds[genre.id] = true;
            if (genre.books) {
              genre.books.forEach(book => {
                allIds[book.id] = true;
              });
            }
          });
        }
        if (node.books) {
          allIds[node.id] = true;
        }
      });
    };
    
    collectIds(booksData);
    setExpandedNodes(allIds);
  };
  
  const collapseAll = () => {
    setExpandedNodes({});
  };
  
  const reset = () => {
    setExpandedNodes({});
    setSearchTerm('');
  };
  
  return (
    <div className="book-tree-container">
      <h1 className="tree-title">📖 Книжный интернет-магазин</h1>
      
      <TreeStats data={booksData} />
      
      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onExpandAll={expandAll}
        onCollapseAll={collapseAll}
        onReset={reset}
      />
      
      <div className="tree-wrapper">
        {booksData.map(author => (
          <TreeNode
            key={author.id}
            node={author}
            level={0}
            searchTerm={searchTerm}
            expandedNodes={expandedNodes}
            onToggle={handleToggle}
          />
        ))}
      </div>
    </div>
  );
};

export default BookTree;