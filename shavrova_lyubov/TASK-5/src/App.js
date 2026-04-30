import React, { useState, useEffect } from "react";
import NoteForm from "./components/NoteForm";
import NoteList from "./components/NoteList";
import SearchBar from "./components/SearchBar";
import FilterBar from "./components/FilterBar";

export default function App() {
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem("notes");
    return saved ? JSON.parse(saved) : [];
  });

  const [search, setSearch] = useState("");
  const [tagFilter, setTagFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const addNote = (note) => {
    setNotes([
      ...notes,
      {
        ...note,
        id: Date.now(),
        date: new Date().toLocaleString(),
      },
    ]);
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((n) => n.id !== id));
  };

  const updateNote = (updatedNote) => {
    setNotes(notes.map((n) => (n.id === updatedNote.id ? updatedNote : n)));
  };

  const clearAll = () => {
    setNotes([]);
  };

  const uniqueTags = [...new Set(notes.map((n) => n.tag).filter(Boolean))];

  const filteredNotes = notes.filter((n) => {
  const matchesSearch = n.text.toLowerCase().includes(search.toLowerCase());
  const matchesTag = tagFilter ? n.tag === tagFilter : true;

  const matchesDate = dateFilter
    ? n.date.startsWith(dateFilter)
    : true;

  return matchesSearch && matchesTag && matchesDate;
});

  return (
    <div className="app">
      <h1>📝 Заметки</h1>

      <NoteForm addNote={addNote} tags={uniqueTags} />
      <SearchBar setSearch={setSearch} />
      <FilterBar
        tags={uniqueTags}
        setTagFilter={setTagFilter}
      />
      <input
        type="date"
        onChange={(e) => setDateFilter(e.target.value)}
      />

      <button className="clear-btn" onClick={clearAll}>
        Очистить всё
      </button>

      <NoteList
        notes={filteredNotes}
        deleteNote={deleteNote}
        updateNote={updateNote}
      />
    </div>
  );
}