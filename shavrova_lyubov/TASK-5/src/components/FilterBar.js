import React from "react";

export default function FilterBar({ tags, setTagFilter }) {
  return (
    <div className="filters">
      <button onClick={() => setTagFilter("")}>Все</button>
      {tags.map((tag, index) => (
        <button key={index} onClick={() => setTagFilter(tag)}>
          {tag}
        </button>
      ))}
    </div>
  );
}