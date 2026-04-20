import React, { useEffect, useState } from "react";
const API_URL = "http://localhost:5000";

export default function NavPanel({setCurrentCategory}){
    const [categories, setCategories] = useState([{
        id: -1,
        name: 'all'
    }]);
    const [activeLinkIndx, setActiveLinkIndx] = useState(0);

    useEffect(()=>{
        const load = async ()=>{
            try{
                const res = await fetch(`${API_URL}/gadgethub/api/product-categories`);
                const json = await res.json();
                setCategories(prev => [...prev, ...json.data.categories]);
            } catch(err){
                console.log(err);
            }
        }
        load();
    }, []);
    return (
        <div className="nav-panel bg-white">
            <ul className="nav-links flex overflow-auto">
                {categories.map((category, indx) => (
                    <li key={indx} className={`link-item clickable border ${indx === activeLinkIndx ? 'active' : ''}`}
                        onClick={()=>{setActiveLinkIndx(indx); setCurrentCategory(category.name)}}>
                        <div className="abs btn btn-primary bg"></div>
                        {category.name || category}
                    </li>
                ))}
            </ul>
        </div>
    );
}