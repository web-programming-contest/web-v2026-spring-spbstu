import React from "react";
import ProductCard from "./ProductCard";

export default function Catalogue({products, cartList, setCartList}){
    return (
        <div className="products-grid">
            {products.map(product => <ProductCard key={product.id} product={product} cartList={cartList} setCartList={setCartList} />)}
        </div>
    );
}