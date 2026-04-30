import React, { useState } from "react";

export default function NoteList({ notes, deleteNote, updateNote }) {
  const [editId, setEditId] = useState(null);

  const [editText, setEditText] = useState("");
  const [editTag, setEditTag] = useState("");
  const [editDate, setEditDate] = useState("");

  const startEdit = (note) => {
    setEditId(note.id);
    setEditText(note.text);
    setEditTag(note.tag || "");
    setEditDate(note.date || "");
  };

  const saveEdit = (note) => {
    updateNote({
      ...note,
      text: editText,
      tag: editTag,
      date: editDate,
    });
    setEditId(null);
  };

  return (
    <div>
      {notes.map((note) => (
        <div key={note.id} className="note">
          {editId === note.id ? (
            <>
              <input
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                placeholder="Текст"
              />

              <select value={editTag} onChange={(e) => setEditTag(e.target.value)}>
                <option value="">Без тега</option>
                {[...new Set(notes.map(n => n.tag).filter(Boolean))].map((t, i) => (
                  <option key={i} value={t}>{t}</option>
                ))}
              </select>

<input
  placeholder="Новый тег"
  value={editTag}
  onChange={(e) => setEditTag(e.target.value)}
/>

              <input
                type="date"
                value={editDate}
                onChange={(e) => setEditDate(e.target.value)}
              />

              <br />
              <button onClick={() => saveEdit(note)}>Сохранить</button>
            </>
          ) : (
            <>
              <p>{note.text}</p>
              <small>🏷 {note.tag || "без тега"}</small>
              <br />
              <small>📅 {note.date}</small>
              <br />

              <button onClick={() => startEdit(note)}>Редактировать</button>
              <button onClick={() => deleteNote(note.id)}>Удалить</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}