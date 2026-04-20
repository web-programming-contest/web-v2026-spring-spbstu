import React, { useState } from "react";

function SearchBar({ onSearch, isLoading }) {
  const [city, setCity] = useState("Москва");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "16px" }}>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Город"
        style={{
          padding: "8px 12px",
          fontSize: "1rem",
          borderRadius: "30px",
          border: "none",
          marginRight: "8px",
        }}
      />
      <button
        type="submit"
        disabled={isLoading}
        style={{
          padding: "8px 16px",
          fontSize: "1rem",
          borderRadius: "30px",
          border: "none",
          background: "#ff9800",
          color: "white",
          cursor: "pointer",
        }}
      >
        {isLoading ? "Загрузка..." : "Найти"}
      </button>
    </form>
  );
}

export default SearchBar;
