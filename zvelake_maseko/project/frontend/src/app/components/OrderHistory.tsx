import { useState } from 'react';
import { ArrowLeft, Package, ShoppingCart, Calendar } from 'lucide-react';
import { mockOrders, groupOrdersByDate } from '../data/orders';
import { OrderDetailsModal } from './OrderDetailsModal';
import { Order } from '../data/orders';

interface OrderHistoryProps {
  onBack: () => void;
}

export function OrderHistory({ onBack }: OrderHistoryProps) {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const groupedOrders = groupOrdersByDate(mockOrders);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'Доставлен';
      case 'shipped':
        return 'В пути';
      case 'processing':
        return 'Обрабатывается';
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Назад</span>
        </button>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">История заказов</h1>
          <p className="text-gray-600">Всего заказов: {mockOrders.length}</p>
        </div>

        {/* Заказы сгруппированные по датам */}
        <div className="space-y-8">
          {Array.from(groupedOrders.entries()).map(([date, orders]) => (
            <div key={date}>
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="w-5 h-5 text-gray-500" />
                <h2 className="text-xl font-semibold text-gray-900">{date}</h2>
              </div>

              <div className="space-y-4">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <div className="p-6">
                      {/* Заголовок заказа */}
                      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                        <div className="flex items-center gap-4">
                          <Package className="w-5 h-5 text-gray-500" />
                          <div>
                            <p className="font-semibold text-gray-900">
                              Заказ #{order.id}
                            </p>
                            <p className="text-sm text-gray-500">
                              {order.date.toLocaleString('ru-RU', {
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(
                              order.status
                            )}`}
                          >
                            {getStatusText(order.status)}
                          </span>
                          <p className="font-bold text-gray-900">
                            {order.totalAmount.toLocaleString('ru-RU')} ₽
                          </p>
                        </div>
                      </div>

                      {/* Товары в заказе */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {order.items.map((item, index) => (
                          <button
                            key={index}
                            onClick={() => setSelectedOrder(order)}
                            className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-left"
                          >
                            <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                              <img
                                src={item.product.image_url}
                                alt={item.product.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-semibold text-gray-900 text-sm line-clamp-2">
                                {item.product.name}
                              </p>
                              <p className="text-xs text-gray-500 mt-1">
                                Количество: {item.quantity}
                              </p>
                              <p className="text-sm font-semibold text-gray-900 mt-1">
                                {item.priceAtPurchase.toLocaleString('ru-RU')} ₽
                              </p>
                            </div>
                          </button>
                        ))}
                      </div>

                      {/* Кнопка просмотра деталей */}
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="text-blue-600 hover:text-blue-700 font-semibold text-sm flex items-center gap-2 transition-colors"
                        >
                          Посмотреть детали заказа
                          <ShoppingCart className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {mockOrders.length === 0 && (
          <div className="text-center py-16">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              У вас пока нет заказов
            </h3>
            <p className="text-gray-600 mb-6">
              Начните покупки в нашем каталоге
            </p>
            <button
              onClick={onBack}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Перейти в каталог
            </button>
          </div>
        )}
      </div>

      {/* Модальное окно деталей заказа */}
      {selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </div>
  );
}
