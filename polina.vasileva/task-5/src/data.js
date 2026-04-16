import book1 from './imgs/book1.webp';
import book2 from './imgs/book2.webp';
import book3 from './imgs/book3.webp';
import book4 from './imgs/book4.webp';
import book5 from './imgs/book5.webp';

// Массив обложек
const covers = [book1, book2, book3, book4, book5];

export const books = Array.from({ length: 180 }, (_, i) => (
  {
    id: i + 1,
    cover: covers[i % covers.length],
    title: `Книга №${i + 1}: ${['Мы','Морфий','Заводной апельсин','Белые ночи','1985'][i % 5]}`,
    rating: (5 * Math.random()).toFixed(1),
    description: `Описание книги номер ${i + 1}. Увлекательное чтиво.`,
    price: 100 + 1000 * Math.random().toFixed(1)
  }
));