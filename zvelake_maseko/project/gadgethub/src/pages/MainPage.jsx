import React, { useState } from "react";
import Catalogue from "../components/Catalog";

export default function MainPage({
    products, 
    cartList, 
    setCartList,
    currentCategory
}){
    return (
        <div className="section">
            <div className="section-info">
                <h1>Каталог</h1>
            </div>
            <div className="section-body">
                {products.length === 0 && <div className="load-spinner"></div>}
                <Catalogue products={currentCategory === 'all' ? products : products.filter(product => product.category.name === currentCategory || product.category === currentCategory)} cartList={cartList} setCartList={setCartList}/>
            </div>
        </div>
    )
}