import { useState, useEffect } from 'react';
import { CartProvider } from '../context/CartContext';
import { Header } from './Header';
import { Home } from './Home';
import { ProductDetails } from './ProductDetails';
import { Cart } from './Cart';
import { Checkout } from './Checkout';
import { Product, products, categories } from '../data/products';
import { useNavigate } from "react-router";
import { useCart } from '../context/CartContext';
import { OrderHistory } from './OrderHistory';

import { SERVER_BASE_URL } from '../utils/settings';
import { useSession } from '../context/SessionContext';

type Page = 'home' | 'product' | 'cart' | 'checkout' | 'orders';

export function IndexPage() {
const [currentPage, setCurrentPage] = useState<Page>('home');
const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
const { addToCart, updateQuantity } = useCart();
const { cartId, setCartId, user } = useSession();
// const [products, setProducts] = useState<Product[]>([]);
// const [categories, setCategories] = useState<string[]>(['Все товары']);
const navigate = useNavigate();

useEffect(()=>{
    if(cartId && user){
        const load = async ()=>{
            try {
                let response = await fetch(`${SERVER_BASE_URL}/api/orders/cart/read`, {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                    cartId: cartId,
                    customerId: user?.id
                    })
                });
                let json = await response.json();
                if(json.success){
                    const data = json.cart_data;
                    console.log(`loaded ${Object.keys(data.items).length} items from cart`);
                    if(data.cart_id !== cartId){
                        setCartId(data.cart_id);
                        sessionStorage.setItem('user:cart_id', data.cart_id);
                    }
                    for(const [productId, qty] of Object.entries(data.items)){
                        const existing = products.find(pr => Number(pr.id) === Number(productId));
                        if(existing){
                            addToCart(existing);
                            updateQuantity(Number(productId), Number(qty));
                        }
                    }
                } else {
                    console.log(json.message);
                }
            } catch(err){
                console.error(err);
            }
        }
        load();
    }
}, []);

// useEffect(()=>{
//   const load = async ()=>{
//       try {
//           let response = await fetch(`${SERVER_BASE_URL}/api/data/products`);
//           let json = await response.json();
//           if(json.success){
//               let productsData = json.data.products as Product[];;
//               setProducts(productsData);
//               setCategories(prev => [...prev, ...Array.from(new Set(productsData.map(product => product.category)))])
//           } else {
//               console.log("Failed to fetch products", json);
//           }
//       } catch(err){
//           console.error(err);
//       }
//   };

//   if(products.length === 0){ load(); }
// }, [])

const handleNavigate = (page: Page) => {
    setCurrentPage(page);
};

const handleViewProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentPage('product');
};

const handleBackToHome = () => {
    setSelectedProduct(null);
    setCurrentPage('home');
};

const handleCheckout = () => {
    if(!sessionStorage.getItem('user')) { navigate('/login'); }
    else setCurrentPage('checkout');
};

const handleOrderComplete = () => {
    setCurrentPage('home');
};

return (
    <div className="min-h-screen bg-gray-50">
    <Header
        onNavigate={handleNavigate}
        currentPage={currentPage}
    />

    {currentPage === 'home' && (
        <Home onViewProduct={handleViewProduct} products={products} categories={categories} />
    )}

    {currentPage === 'product' && selectedProduct && (
        <ProductDetails
        product={selectedProduct}
        onBack={handleBackToHome}
        />
    )}

    {currentPage === 'cart' && (
        <Cart
        onCheckout={handleCheckout}
        onContinueShopping={handleBackToHome}
        />
    )}

    {currentPage === 'checkout' && (
        <Checkout onOrderComplete={handleOrderComplete} />
    )}
    {currentPage === 'orders' && (
        <OrderHistory onBack={handleBackToHome} />
    )}
    </div>
);
}