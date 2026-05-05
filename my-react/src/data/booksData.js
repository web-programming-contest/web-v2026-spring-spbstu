// Данные в формате для дерева: Автор -> Издательство -> Жанр -> Книги
// src/data/booksData.js - Данные книг
export const booksData = [
  {
    id: 1,
    name: "Лев Толстой",
    publishers: [
      {
        id: 11,
        name: "Эксмо",
        genres: [
          {
            id: 111,
            name: "Роман",
            books: [
              { id: 1111, name: "Война и мир" },
              { id: 1112, name: "Анна Каренина" }
            ]
          },
          {
            id: 112,
            name: "Повесть",
            books: [
              { id: 1121, name: "Детство" },
              { id: 1122, name: "Отрочество" }
            ]
          }
        ]
      },
      {
        id: 12,
        name: "АСТ",
        genres: [
          {
            id: 121,
            name: "Роман",
            books: [
              { id: 1211, name: "Воскресение" }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 2,
    name: "Фёдор Достоевский",
    publishers: [
      {
        id: 21,
        name: "Азбука",
        genres: [
          {
            id: 211,
            name: "Роман",
            books: [
              { id: 2111, name: "Преступление и наказание" },
              { id: 2112, name: "Братья Карамазовы" },
              { id: 2113, name: "Идиот" }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 3,
    name: "Джордж Оруэлл",
    publishers: [
      {
        id: 31,
        name: "АСТ",
        genres: [
          {
            id: 311,
            name: "Антиутопия",
            books: [
              { id: 3111, name: "1984" },
              { id: 3112, name: "Скотный двор" }
            ]
          }
        ]
      }
    ]
  }
];