import { ShoppingCart, Smartphone, User, Package } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router';

interface HeaderProps {
  onNavigate: (page: 'home' | 'cart' | 'checkout' | 'orders') => void;
  currentPage: string;
}

export function Header({ onNavigate, currentPage }: HeaderProps) {
  const { totalItems } = useCart();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <Smartphone className="w-8 h-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">Gadget Hub</span>
          </button>

          <nav className="flex items-center gap-6">
            <button
              onClick={() => onNavigate('home')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                currentPage === 'home'
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Каталог
            </button>

            <button
              onClick={() => onNavigate('orders')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                currentPage === 'orders'
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Package className="w-5 h-5" />
              <span className="hidden sm:inline">Заказы</span>
            </button>

            <button
              onClick={() => onNavigate('cart')}
              className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ShoppingCart className="w-6 h-6 text-gray-700" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
            <button
              className="rounded-full"
              onClick={()=>{
                let user = sessionStorage.getItem('user');
                if(user && user.length > 0){
                  navigate('/profile')
                } else {
                  navigate('/login');
                }
              }}>
                <User className="w-6 h-6" />
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}
