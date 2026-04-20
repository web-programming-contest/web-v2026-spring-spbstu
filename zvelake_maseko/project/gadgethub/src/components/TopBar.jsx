import React from "react";


export default function TopBar({binCount, setCurrentPage}){
    return (
        <div className="top-bar">
            <div className="top-bar-content flex">
                <div className="left-panel">
                    <div className="logo">
                        <h3>GadgetHub</h3>
                    </div>
                </div>
                <div className="right-panel flex">
                    <div onClick={()=>{setCurrentPage(0)}} className="clickable btn btn-secondary" style={{padding: '5px'}}>
                        Каталог
                    </div>
                    <div className="bin-btn btn btn-secondary" onClick={()=>{setCurrentPage(1)}}>
                        {binCount > 0 && <span className="bin-count abs">{binCount}</span>}
                        <i className="fa-solid fa-cart-arrow-down"></i>
                    </div>
                </div>
            </div>
        </div>
    )
}