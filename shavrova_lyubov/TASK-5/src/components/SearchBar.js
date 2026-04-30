import React from "react";

export default function SearchBar({ setSearch }) {
  return (
    <input
      placeholder="Поиск..."
      onChange={(e) => setSearch(e.target.value)}
    />
  );
}