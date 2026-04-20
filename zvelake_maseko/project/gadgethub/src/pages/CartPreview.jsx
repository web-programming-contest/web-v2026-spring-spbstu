import React, {useState, useEffect} from "react";
import {formatPrice} from "../utils/utils.js";

export default function CartPreview({
    cartList, setCartList,
    setCurrentPage
}){
    const [total, setTotal] = useState(0);
    const [delivery, setDelivery] = useState(0);

    useEffect(()=>{
        setTotal(formatPrice(cartList.reduce((prev, curr)=>{
            return prev + (Number(curr.product.price) * curr.count);
        }, 0)));
    }, [cartList]);

    const increaseProductQty = (id)=>{
        setCartList(prev => {
            return prev.map(item => 
                item.product.id === id ? {...item, count: item.count + 1}:
                item
            );
        });
    };

    const decreaseProductQty = (id) => {
        const existingItem = cartList.find(item => item.product.id === id);
        if(existingItem && existingItem.count - 1 === 0){
            return removeProductFromCart(id);
        }
        setCartList(prev => {
            return prev.map(item => 
                item.product.id === id ? {...item, count: item.count - 1}:
                item
            );

        });
    };

    const removeProductFromCart = (id) => {
        setCartList(prev => {
            return prev.filter(item => item.product.id !== id );
        });
    };
    
    return (
        <div className="section">
            <div className="section-info">
                <div className="section-title">
                    <h1>Корзина</h1>
                </div>
            </div>
            { cartList.length === 0 ? 
            <div className="w-full">
                <div className="flex col center m-auto">
                    <h1 className="grow-0 shrink-0">Корзина пуста</h1>
                    <button type="button" className="btn btn-primary bold" onClick={()=>{setCurrentPage(0);}}>В каталог</button>
                </div>
            </div> :
            <div className="cart-preview flex">
                <div className="left-panel col-md-8">
                    <div className="products-list">
                        {cartList.map(item => (
                            <div key={item.product.id} className="product box grid mb-10">
                                <div className="image-container">
                                    <img src={item.product.image_url} alt="image"/>
                                </div>
                                <div className="flex">
                                    <div className="product-info">
                                        <span className="product-name bold">{item.product.name}</span>
                                        <br/>
                                        <div className="category">
                                            {item.product.category.name ?? item.product.category}
                                        </div>
                                        <div className="spacer"></div>
                                        <div className="flex col">
                                            <span className="bold product-price">{formatPrice(item.product.price)} ₽</span>
                                            <span className="grey">{cartList.length} отзывов</span>
                                        </div>
                                    </div>
                                    <div className="product-actions flex col">
                                        <button type="button" className="del-btn red btn" onClick={()=>{removeProductFromCart(item.product.id)}}>
                                            <i className="fa-solid fa-trash-can"></i>
                                        </button>
                                        <div className="flex">
                                            <button type="button" className="incr-btn btn" onClick={()=>{increaseProductQty(item.product.id);}}>
                                                <i className="fa-solid fa-plus"></i>
                                            </button>
                                            <span>{item.count}</span>
                                            <button type="button" className="decr-btn btn" onClick={()=>{decreaseProductQty(item.product.id);}}>
                                                <i className="fa-solid fa-minus"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        ))}
                    </div>
                </div>
                <div className="right-panel col-md-4">
                    <div className="form-section sticky" style={{top: '100px'}}>
                        <div className="form-section-title">
                            <h2>Ваш заказ</h2>
                        </div>
                        <div className="order-info">
                            <div className="items-list">
                                {cartList.map(item => (
                                <div key={item.product.id} className="list-item flex">
                                    <span>{item.product.name} x{item.count}</span>
                                    <span><strong>{formatPrice(item.product.price)} ₽</strong></span>
                                </div>))}
                            </div>
                        </div>
                        <div className="divider"></div>
                        <div className="order-summary flex-col">
                            <div className="between flex mb-10">
                                <span>Товары</span>
                                <span>{total}</span>
                            </div>
                            <div className="between flex mb-10">
                                <span>Доставка</span>
                                <span>{delivery}</span>
                            </div>
                            <div className="divider"></div>
                            <div className="between flex mb-10">
                                <span><strong>Итого</strong></span>
                                <span>{total + delivery}</span>
                            </div>
                        </div>
                        <div className="flex col">
                            <button className="btn btn-primary w-full" type="button" onClick={()=>{setCurrentPage(2);}}>
                                <span className="bold">Оформить заказ</span>
                            </button>
                            <button className="btn bg-white w-full border" onClick={()=>{setCurrentPage(0);}}>
                                <span className="bold">Продолжать покупку</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            }
        </div>
    );
}