import React, { useState } from "react";

export default function NoteForm({ addNote, tags }) {
  const [text, setText] = useState("");
  const [tag, setTag] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text) return;

    addNote({ text, tag });
    setText("");
    setTag("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Текст заметки"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      {/* выпадающий список */}
      <select value={tag} onChange={(e) => setTag(e.target.value)}>
        <option value="">Без тега</option>
        {tags.map((t, i) => (
          <option key={i} value={t}>
            {t}
          </option>
        ))}
      </select>

      {/* можно ввести новый тег */}
      <input
        placeholder="Новый тег"
        value={tag}
        onChange={(e) => setTag(e.target.value)}
      />

      <button>Добавить</button>
    </form>
  );
}