import { X, ShoppingCart, Star, Package } from 'lucide-react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Order, OrderItem } from '../data/orders';
import { Product, products } from '../data/products';
import { useCart } from '../context/CartContext';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface OrderDetailsModalProps {
  order: Order;
  onClose: () => void;
}

export function OrderDetailsModal({ order, onClose }: OrderDetailsModalProps) {
  const { addToCart } = useCart();

  // Получить товары той же категории для рекомендаций
  const getRelatedProducts = (product: Product): Product[] => {
    return products.filter(
      (p) => p.category === product.category && p.id !== product.id
    ).slice(0, 6);
  };

  const handleAddToCart = (product: Product) => {
    addToCart(product);
  };

  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="min-h-screen px-4 flex items-center justify-center">
        {/* Overlay */}
        <div
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
          onClick={onClose}
        />

        {/* Modal */}
        <div className="relative bg-white rounded-xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Заказ #{order.id}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Оформлен {order.date.toLocaleDateString('ru-RU', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-6 h-6 text-gray-500" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Товары в заказе */}
            <div className="space-y-6">
              {order.items.map((item: OrderItem, index: number) => (
                <div key={index}>
                  {/* Карточка товара */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Изображение */}
                      <div className="aspect-square bg-white rounded-lg overflow-hidden">
                        <ImageWithFallback
                          src={item.product.image_url}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Информация о товаре */}
                      <div className="flex flex-col">
                        <div className="text-sm text-blue-600 font-semibold mb-2">
                          {item.product.category}
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">
                          {item.product.name}
                        </h3>

                        <div className="flex items-center gap-4 mb-4">
                          <div className="flex items-center gap-1">
                            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                            <span className="font-semibold">{item.product.rating}</span>
                          </div>
                          <span className="text-gray-500">
                            ({item.product.reviews.length} отзывов)
                          </span>
                        </div>

                        <div className="mb-4">
                          <p className="text-gray-600 leading-relaxed">
                            {item.product.description}
                          </p>
                        </div>

                        <div className="mb-4">
                          <p className="text-sm text-gray-500 mb-2">Количество в заказе:</p>
                          <div className="flex items-center gap-2">
                            <Package className="w-5 h-5 text-gray-500" />
                            <span className="font-semibold text-gray-900">
                              {item.quantity} шт.
                            </span>
                          </div>
                        </div>

                        <div className="mb-6">
                          <p className="text-sm text-gray-500 mb-1">Цена на момент покупки:</p>
                          <p className="text-3xl font-bold text-gray-900">
                            {item.priceAtPurchase.toLocaleString('ru-RU')} ₽
                          </p>
                        </div>

                        <div className="mt-auto">
                          <button
                            onClick={() => handleAddToCart(item.product)}
                            disabled={!item.product.inStock}
                            className={`w-full py-3 px-6 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors ${
                              item.product.inStock
                                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            }`}
                          >
                            <ShoppingCart className="w-5 h-5" />
                            {item.product.inStock ? 'Добавить в корзину снова' : 'Нет в наличии'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Рекомендации: товары той же категории */}
                  {getRelatedProducts(item.product).length > 0 && (
                    <div className="mt-8">
                      <h4 className="text-xl font-bold text-gray-900 mb-4">
                        Другие товары из категории "{item.product.category}"
                      </h4>
                      <div className="px-2">
                        <Slider {...sliderSettings}>
                          {getRelatedProducts(item.product).map((relatedProduct) => (
                            <div key={relatedProduct.id} className="px-2">
                              <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                                <div className="aspect-square bg-gray-100">
                                  <img
                                    src={relatedProduct.image_url}
                                    alt={relatedProduct.name}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div className="p-4">
                                  <h5 className="font-semibold text-gray-900 text-sm line-clamp-2 mb-2">
                                    {relatedProduct.name}
                                  </h5>
                                  <div className="flex items-center gap-1 mb-2">
                                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                    <span className="text-sm font-semibold">
                                      {relatedProduct.rating}
                                    </span>
                                  </div>
                                  <p className="font-bold text-gray-900 mb-3">
                                    {relatedProduct.price.toLocaleString('ru-RU')} ₽
                                  </p>
                                  <button
                                    onClick={() => handleAddToCart(relatedProduct)}
                                    disabled={!relatedProduct.inStock}
                                    className={`w-full py-2 px-4 rounded-lg text-sm font-semibold transition-colors ${
                                      relatedProduct.inStock
                                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                    }`}
                                  >
                                    {relatedProduct.inStock ? 'В корзину' : 'Нет в наличии'}
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </Slider>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Итого */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <span className="text-xl font-semibold text-gray-900">
                  Итого по заказу:
                </span>
                <span className="text-3xl font-bold text-gray-900">
                  {order.totalAmount.toLocaleString('ru-RU')} ₽
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
