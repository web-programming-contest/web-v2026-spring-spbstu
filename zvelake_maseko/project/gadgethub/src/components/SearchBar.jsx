import React from "react";

export default function SearchBar(){
    return (
        <div className="search-bar flex">
            <i className="fa-solid fa-magnifying-glass icon"></i>
            <input type="text" name="search"/>
            <i className="fa-solid fa-circle-xmark icon"></i>
        </div>
    );
}