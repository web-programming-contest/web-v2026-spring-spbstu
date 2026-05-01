import { ArrowLeft, Star, ShoppingCart, Check } from 'lucide-react';
import { Product } from '../data/products';
import { useCart } from '../context/CartContext';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ProductDetailsProps {
  product: Product;
  onBack: () => void;
}

export function ProductDetails({ product, onBack }: ProductDetailsProps) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Назад к каталогу</span>
        </button>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 p-8">
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <ImageWithFallback
                src={product.image_url}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex flex-col">
              <div className="text-sm text-blue-600 font-semibold mb-2">
                {product.category}
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{product.rating}</span>
                </div>
                <span className="text-gray-500">({product.reviews.length} отзывов)</span>
                {product.inStock ? (
                  <div className="flex items-center gap-1 text-green-600">
                    <Check className="w-5 h-5" />
                    <span className="font-semibold">В наличии</span>
                  </div>
                ) : (
                  <span className="text-red-600 font-semibold">Нет в наличии</span>
                )}
              </div>

              <div className="mb-6">
                <p className="text-4xl font-bold text-gray-900">
                  {product.price.toLocaleString('ru-RU')} ₽
                </p>
              </div>

              <div className="mb-8">
                <h2 className="font-semibold text-gray-900 mb-3">Описание</h2>
                <p className="text-gray-600 leading-relaxed">
                  {product.description}
                </p>
              </div>

              <div className="mb-8">
                <h2 className="font-semibold text-gray-900 mb-3">Характеристики</h2>
                <ul className="space-y-2">
                  {product.specs.map((spec, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-auto">
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className={`w-full py-4 px-6 rounded-lg font-semibold text-lg flex items-center justify-center gap-2 transition-colors ${
                    product.inStock
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <ShoppingCart className="w-5 h-5" />
                  {product.inStock ? 'Добавить в корзину' : 'Нет в наличии'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
