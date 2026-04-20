import React, { useEffect, useState } from "react";
import TopBar from "./components/TopBar";
import NavPanel from "./components/NavPanel";
import MainPage from "./pages/MainPage";
import CartPreview from "./pages/CartPreview";
import PaymentPage from "./pages/PaymentPage";


const API_URL =  "http://localhost:5000";
const API_KEY = ""

export default function App(){
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [cartList, setCartList] = useState([]);
    const [binQty, setBinQty] = useState(0);
    const [currentCategory, setCurrentCategory] = useState('all');

    useEffect(()=>{
        const load = async ()=>{
            try{
                const response = await fetch(`${API_URL}/gadgethub/api/products`);
                const json = await response.json();

                if(!json.success){
                    console.log("Failed to fetch data from api");
                    return;
                }
                if(json.data.products && Array.isArray(json.data.products)){
                    setProducts(json.data.products)
                }
            } catch(err){
                console.log(err);
            }
        }

        load();
    }, []);

    useEffect(()=>{
        setBinQty(
             cartList.reduce((acc, curr) => acc + curr.count, 0)
        );
       
    }, [cartList]);
    return (
        <>
            <TopBar binCount={binQty} setCurrentPage={setCurrentPage}/>
            {currentPage === 0 && <NavPanel setCurrentCategory={setCurrentCategory}/>}
            {currentPage === 0 && <MainPage
                                    products={products}
                                    setCurrentPage={setCurrentPage}
                                    cartList={cartList}
                                    setCartList={setCartList}
                                    currentCategory={currentCategory}
                                    />}
            {currentPage === 1 && <CartPreview
                                    cartList={cartList}
                                    setCartList={setCartList}
                                    setCurrentPage={setCurrentPage}
                                    />}
            {currentPage === 2 && <PaymentPage
                                    cartList={cartList}
                                    setCurrentPage={setCurrentPage}
                                    />}
        </>
    );
}
