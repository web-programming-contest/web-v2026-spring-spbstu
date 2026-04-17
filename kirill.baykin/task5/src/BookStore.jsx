import React, { useState } from 'react';

const BookStore = () => {
    // Исходные данные книг
    const initialBooks = [
        {
            id: 1,
            cover: "https://via.placeholder.com/150x200?text=Book+1",
            title: "Мастер и Маргарита",
            rating: 4.8,
            description: "Роман Михаила Булгакова о любви, дьяволе и Москве 1930-х годов.",
            price: 450
        },
        {
            id: 2,
            cover: "https://via.placeholder.com/150x200?text=Book+2",
            title: "Атомные привычки",
            rating: 4.9,
            description: "Джеймс Клир о том, как маленькие изменения приводят к большим результатам.",
            price: 380
        },
        {
            id: 3,
            cover: "https://via.placeholder.com/150x200?text=Book+3",
            title: "1984",
            rating: 4.7,
            description: "Джордж Оруэлл о тоталитаризме и потере свободы.",
            price: 520
        },
        {
            id: 4,
            cover: "https://via.placeholder.com/150x200?text=Book+4",
            title: "Три товарища",
            rating: 4.9,
            description: "Эрих Мария Ремарк о дружбе и любви в послевоенной Германии.",
            price: 490
        }
    ];

    // Состояния для сортировки
    const [books, setBooks] = useState(initialBooks);
    const [sortField, setSortField] = useState(null); // 'title', 'price', 'rating'
    const [sortOrder, setSortOrder] = useState(null); // 'asc', 'desc', null

    // Функция сортировки
    const handleSort = (field) => {
        if (sortField === field) {
            // Если уже сортируем по этому полю
            if (sortOrder === 'asc') {
                setSortOrder('desc');
            } else if (sortOrder === 'desc') {
                setSortOrder(null);
                setSortField(null);
                setBooks([...initialBooks]);
                return;
            }
        } else {
            // Сортируем по новому полю
            setSortField(field);
            setSortOrder('asc');
        }

        // Применяем сортировку
        const sortedBooks = [...books];
        const order = sortField === field && sortOrder === 'asc' ? 'desc' : 'asc';

        sortedBooks.sort((a, b) => {
            let aValue, bValue;

            if (field === 'title') {
                aValue = a.title;
                bValue = b.title;
                return order === 'asc'
                    ? aValue.localeCompare(bValue)
                    : bValue.localeCompare(aValue);
            } else if (field === 'price') {
                aValue = a.price;
                bValue = b.price;
                return order === 'asc' ? aValue - bValue : bValue - aValue;
            } else if (field === 'rating') {
                aValue = a.rating;
                bValue = b.rating;
                return order === 'asc' ? aValue - bValue : bValue - aValue;
            }
            return 0;
        });

        setBooks(sortedBooks);
    };

    // Функция для получения стиля кнопки и стрелочки
    const getButtonStyle = (field) => {
        const isActive = sortField === field;
        const arrow = isActive
            ? (sortOrder === 'asc' ? ' ↑' : (sortOrder === 'desc' ? ' ↓' : ''))
            : '';

        return {
            backgroundColor: isActive ? '#007bff' : '#f0f0f0',
            color: isActive ? 'white' : 'black',
            border: '1px solid #ccc',
            padding: '10px 20px',
            margin: '0 5px',
            cursor: 'pointer',
            borderRadius: '5px',
            fontSize: '16px',
            transition: 'all 0.3s'
        };
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h2>Книжный интернет-магазин</h2>

            {/* Кнопки сортировки */}
            <div style={{ marginBottom: '20px' }}>
                <button
                    onClick={() => handleSort('title')}
                    style={getButtonStyle('title')}
                >
                    Название{sortField === 'title' && (sortOrder === 'asc' ? ' ↑' : ' ↓')}
                </button>
                <button
                    onClick={() => handleSort('price')}
                    style={getButtonStyle('price')}
                >
                    Цена{sortField === 'price' && (sortOrder === 'asc' ? ' ↑' : ' ↓')}
                </button>
                <button
                    onClick={() => handleSort('rating')}
                    style={getButtonStyle('rating')}
                >
                    Рейтинг{sortField === 'rating' && (sortOrder === 'asc' ? ' ↑' : ' ↓')}
                </button>
            </div>

            {/* Список книг */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                {books.map(book => (
                    <div key={book.id} style={{
                        border: '1px solid #ddd',
                        borderRadius: '8px',
                        padding: '15px',
                        width: '250px',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}>
                        {/* Обложка */}
                        <img
                            src={book.cover}
                            alt={book.title}
                            style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '4px' }}
                        />

                        {/* Название */}
                        <h3 style={{ margin: '10px 0' }}>{book.title}</h3>

                        {/* Рейтинг */}
                        <div style={{ color: '#ffc107', margin: '5px 0' }}>
                            {'★'.repeat(Math.floor(book.rating))}{'☆'.repeat(5 - Math.floor(book.rating))}
                            <span style={{ color: '#666', marginLeft: '5px' }}>({book.rating})</span>
                        </div>

                        {/* Описание */}
                        <p style={{ fontSize: '14px', color: '#666', margin: '10px 0' }}>
                            {book.description.length > 100
                                ? book.description.substring(0, 100) + '...'
                                : book.description}
                        </p>

                        {/* Цена */}
                        <div style={{
                            fontSize: '20px',
                            fontWeight: 'bold',
                            color: '#e44d26',
                            marginTop: '10px'
                        }}>
                            {book.price} ₽
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BookStore;
