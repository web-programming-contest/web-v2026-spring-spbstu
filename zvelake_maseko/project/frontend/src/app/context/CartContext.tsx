import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Product } from '../data/products';
import { sessionInterface } from '../data/session';
import { SERVER_BASE_URL } from '../utils/settings';
import { useSession } from './SessionContext';

export interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [session, setSession] = useState<sessionInterface | null>(null);
  const { user, cartId, setCartId, removeCartId } = useSession();

  let cookies = Object.fromEntries(
    document.cookie.split(':').map(c => c.split('='))
  );
  useEffect(()=>{
    const stored = sessionStorage.getItem('user');
    if(stored){
      setSession(JSON.parse(stored) as sessionInterface)
    }
  }, []);

  const addToCart = (product: Product) => {
    //let cartId = sessionStorage.getItem('user:cart_id') || cookies.cart_id;
    setItems(current => {
      
      let newCart: CartItem[] = [];
      const existing = current.find(item => item.id === product.id);
      if (existing) {
        
        newCart = current.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        newCart = [...current, {...product, quantity: 1}];
      }
      if(cartId){
        fetch(`${SERVER_BASE_URL}/api/orders/cart/id/${cartId}/add`,{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            customerId: session?.id,
            productId: product.id,
            quantity: existing ? existing.quantity + 1 : 1
          })
        });
      } else {
        fetch(`${SERVER_BASE_URL}/api/orders/cart/create`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            customerId: user?.id,
            productId: product.id,
            quantity: 1
          })
        })
        .then(response => response.json())
        .then(data => {
          if(data.success){
            sessionStorage.setItem(`user:cart_id`, data.cart_id);
            setCartId(data.cart_id);
          } else {
            console.error(data.message);
          }
        })
        .catch(err => {
          console.error(err);
        });
      }
      
      return newCart; 

    });
  };

  const removeFromCart = (productId: number) => {
    //let cartId = sessionStorage.getItem('user:cart_id') || cookies.cart_id;
    fetch(`${SERVER_BASE_URL}/api/orders/cart/id/${cartId}/remove`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        customerId: user?.id,
        productId: productId
      })
    });
    setItems(current => {
      let newCart = current.filter(item => item.id !== productId);
      if(newCart.length === 0){ removeCartId(); sessionStorage.removeItem('user:cart_id'); }
      return newCart;
    });
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    //let cartId = sessionStorage.getItem('user:cart_id') || cookies.cart_id;
    fetch(`${SERVER_BASE_URL}/api/orders/cart/id/${cartId}/add`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        customerId: session?.id,
        productId: productId,
        quantity: quantity
      })
    });
    setItems(current =>
      current.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    //let cartId = sessionStorage.getItem('user:cart_id') || cookies.cart_id;
    fetch(`${SERVER_BASE_URL}/api/orders/cart/id/${cartId}/clear`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        customerId: session?.id
      })
    });
    sessionStorage.removeItem('user:cart_id');
    removeCartId();
    setItems([]);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}
