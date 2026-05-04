import { Product } from './products';
import { Reviews } from './reviews';

export interface OrderItem {
  product: Product;
  quantity: number;
  priceAtPurchase: number;
}

export interface Order {
  id: string;
  date: Date;
  items: OrderItem[];
  totalAmount: number;
  status: 'delivered' | 'processing' | 'shipped';
}

export interface OrderApiResponse {
    id: string;
    date: string;
    items: Product[];
}

// Вспомогательная функция для генерации случайных отзывов
function generateRandomReviews(productId: number, count: number): Reviews[] {
  const reviewTexts = [
    "Отличный продукт! Рекомендую.",
    "Хорошее соотношение цена-качество.",
    "Быстрая доставка, товар как на фото.",
    "Пользуюсь уже месяц, всё отлично.",
    "Лучшее в своём классе!",
    "Нормально, но есть нюансы.",
    "Цена завышена, но качество хорошее.",
    "Продавец отличный, товар супер!",
    "Брак попался, пришлось вернуть.",
    "Не соответствует ожиданиям."
  ];
  
  const reviews: Reviews[] = [];
  for (let i = 0; i < count; i++) {
    reviews.push({
      id: Math.floor(Math.random() * 1000) + 1,
      user_id: Math.floor(Math.random() * 50) + 1,
      product_id: productId,
      review: reviewTexts[Math.floor(Math.random() * reviewTexts.length)],
      created_at: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleString()
    });
  }
  return reviews;
}

// Вспомогательная функция для генерации случайного рейтинга
function generateRandomRating(): number {
  return parseFloat((3 + Math.random() * 2).toFixed(1)); // от 3.0 до 5.0
}

// Мок-данные истории заказов
export const mockOrders: Order[] = [
  {
    id: 'ORD-2026-001',
    date: new Date('2026-05-01'),
    items: [
      {
        product: {
          id: 1,
          name: "iPhone 15 Pro",
          category: "Смартфоны",
          price: 89999,
          image_url: "https://images.unsplash.com/photo-1764744224150-5d54a48f7947?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydHBob25lJTIwZ2FkZ2V0JTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NzYwOTIwMTd8MA&ixlib=rb-4.1.0&q=80&w=1080",
          description: "Профессиональная камера. Мощный чип A17 Pro. Титановый корпус.",
          specs: ["6.1 дюйма", "A17 Pro", "256GB", "48MP камера"],
          inStock: true,
          rating: generateRandomRating(),
          reviews: generateRandomReviews(1, 3)
        },
        quantity: 1,
        priceAtPurchase: 89999
      },
      {
        product: {
          id: 8,
          name: "Sony WH-1000XM5",
          category: "Наушники",
          price: 29999,
          image_url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aXJlbGVzcyUyMGhlYWRwaG9uZXN8ZW58MXx8fHwxNzc2MDc1OTg5fDA&ixlib=rb-4.1.0&q=80&w=1080",
          description: "Лучшее в классе шумоподавление. Премиум звук Hi-Res Audio.",
          specs: ["ANC", "30 часов работы", "LDAC", "Складные"],
          inStock: true,
          rating: generateRandomRating(),
          reviews: generateRandomReviews(8, 4)
        },
        quantity: 1,
        priceAtPurchase: 29999
      }
    ],
    totalAmount: 119998,
    status: 'delivered'
  },
  {
    id: 'ORD-2026-002',
    date: new Date('2026-04-28'),
    items: [
      {
        product: {
          id: 5,
          name: "MacBook Pro 16\"",
          category: "Ноутбуки",
          price: 249999,
          image_url: "https://images.unsplash.com/photo-1511385348-a52b4a160dc2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXB0b3AlMjBjb21wdXRlcnxlbnwxfHx8fDE3NzYwODM3MTF8MA&ixlib=rb-4.1.0&q=80&w=1080",
          description: "Чип M3 Max. Невероятная производительность для профессионалов.",
          specs: ["16.2 дюйма", "M3 Max", "36GB RAM", "1TB SSD"],
          inStock: true,
          rating: generateRandomRating(),
          reviews: generateRandomReviews(5, 5)
        },
        quantity: 1,
        priceAtPurchase: 249999
      }
    ],
    totalAmount: 249999,
    status: 'delivered'
  },
  {
    id: 'ORD-2026-003',
    date: new Date('2026-04-28'),
    items: [
      {
        product: {
          id: 11,
          name: "Apple Watch Series 9",
          category: "Умные часы",
          price: 39999,
          image_url: "https://images.unsplash.com/photo-1758348844355-2ef28345979d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxzbWFydHdhdGNoJTIwd2VhcmFibGV8ZW58MXx8fHwxNzc2MDkyMDE4fDA&ixlib=rb-4.1.0&q=80&w=1080",
          description: "Чип S9. Яркий Always-On дисплей. Расширенные функции здоровья.",
          specs: ["1.9 дюйма", "S9 chip", "18 часов", "GPS + Cellular"],
          inStock: true,
          rating: generateRandomRating(),
          reviews: generateRandomReviews(11, 2)
        },
        quantity: 2,
        priceAtPurchase: 39999
      }
    ],
    totalAmount: 79998,
    status: 'delivered'
  },
  {
    id: 'ORD-2026-004',
    date: new Date('2026-04-25'),
    items: [
      {
        product: {
          id: 2,
          name: "Samsung Galaxy S24",
          category: "Смартфоны",
          price: 79999,
          image_url: "https://images.unsplash.com/photo-1757847633980-b640b22ed317?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxzbWFydHBob25lJTIwZ2FkZ2V0JTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NzYwOTIwMTd8MA&ixlib=rb-4.1.0&q=80&w=1080",
          description: "AI-функции нового поколения. Яркий Dynamic AMOLED дисплей.",
          specs: ["6.2 дюйма", "Snapdragon 8 Gen 3", "512GB", "50MP камера"],
          inStock: true,
          rating: generateRandomRating(),
          reviews: generateRandomReviews(2, 3)
        },
        quantity: 1,
        priceAtPurchase: 79999
      },
      {
        product: {
          id: 10,
          name: "AirPods Max",
          category: "Наушники",
          price: 54999,
          image_url: "https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHx3aXJlbGVzcyUyMGhlYWRwaG9uZXN8ZW58MXx8fHwxNzc2MDc1OTg5fDA&ixlib=rb-4.1.0&q=80&w=1080",
          description: "Вычислительное аудио от Apple. Алюминиевые чаши премиум качества.",
          specs: ["ANC", "20 часов работы", "Spatial Audio", "H1 чип"],
          inStock: true,
          rating: generateRandomRating(),
          reviews: generateRandomReviews(10, 4)
        },
        quantity: 1,
        priceAtPurchase: 54999
      }
    ],
    totalAmount: 134998,
    status: 'delivered'
  },
  {
    id: 'ORD-2026-005',
    date: new Date('2026-04-20'),
    items: [
      {
        product: {
          id: 6,
          name: "ASUS ROG Zephyrus",
          category: "Ноутбуки",
          price: 179999,
          image_url: "https://images.unsplash.com/photo-1618424181497-157f25b6ddd5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxsYXB0b3AlMjBjb21wdXRlcnxlbnwxfHx8fDE3NzYwODM3MTF8MA&ixlib=rb-4.1.0&q=80&w=1080",
          description: "Игровой ноутбук с RTX 4080. 240Hz дисплей для максимальной плавности.",
          specs: ["15.6 дюйма", "RTX 4080", "32GB RAM", "2TB SSD"],
          inStock: true,
          rating: generateRandomRating(),
          reviews: generateRandomReviews(6, 3)
        },
        quantity: 1,
        priceAtPurchase: 179999
      }
    ],
    totalAmount: 179999,
    status: 'delivered'
  }
];

// Группировка заказов по датам
export function groupOrdersByDate(orders: Order[]): Map<string, Order[]> {
  const grouped = new Map<string, Order[]>();
  
  orders.forEach(order => {
    const dateKey = order.date.toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
    if (!grouped.has(dateKey)) {
      grouped.set(dateKey, []);
    }
    grouped.get(dateKey)!.push(order);
  });
  
  return grouped;
}