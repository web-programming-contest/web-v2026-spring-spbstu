import React, {useEffect, useState} from "react";
import UserReview from "./UserReview";
import {formatPrice} from "../utils/utils.js";

export default function ProductCard({
    product, 
    cartList, 
    setCartList, 
    setProductPreview
}){
    const [showReviews, setShowReviews] = useState(false);
    const addToCart = ()=>{
        setCartList(prev => {
            const existingItem = prev.find(item => item.product.id === product.id);
            
            if(existingItem){
                return prev.map(item => 
                    existingItem.product.id === product.id ? {...item, count: item.count + 1}
                    : item
                );
            } else {
                return [...prev, {
                    count: 1,
                    product: product
                }]
            }
        });
    }
    useEffect(()=>{
        if(showReviews){
            document.body.style.setProperty('overflow', 'hidden');
            document.body.style.setProperty('position', 'fixed');
            document.body.style.setProperty('width', '100%');
        }
        return ()=>{
            document.body.style.removeProperty('overflow');
            document.body.style.removeProperty('position');
            document.body.style.removeProperty('width');
        }
    }, [showReviews]);
    
    return (
        <>
        {
        showReviews ? 
        <UserReview product={product} setShowReviews={setShowReviews}/> : 
        <div className="product-card card">
            <div className="card-header">
                {product.availability_status === 'out of stock' && <span className="product-status abs">Нет в наличии</span>}
                <div className="image-container full">
                    <img className="product-image full" src={product.image_url}/>
                </div>
            </div>
            <div className="card-body">
                <span className="category">{product.category.name ?? product.category }</span>
                <div className="product-description">
                    {product.description}
                </div>
            </div>
            <div className="card-footer">
                <div className="flex product-actions">
                    <div className="price-tag">
                        <span className="product-price">{formatPrice(product.price)} ₽</span><br/>
                        <span className="grey clickable" onClick={()=>{setShowReviews(true);}}>
                            {product.reviews.length} отзывов
                        </span>
                    </div>
                    <div className={`cart-btn btn btn-primary ${product.availability_status === 'out of stock' ? 'disabled' : ''}`}
                                    onClick={(e)=>{
                                        e.stopPropagation();
                                        if(product.availability_status !== 'out of stock') addToCart();
                                    }}>
                        <i className="fa-solid fa-cart-arrow-down"></i>
                    </div>
                </div>
            </div>
            
        </div>
        }
        </>
        
    );
}