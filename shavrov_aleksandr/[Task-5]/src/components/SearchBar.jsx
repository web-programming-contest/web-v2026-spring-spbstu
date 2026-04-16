import { useState } from 'react'
import styles from './SearchBar.module.css'

export default function SearchBar({ onSearch }) {
  const [city, setCity] = useState('Moscow')

  function handleSubmit(e) {
    e.preventDefault()
    onSearch(city)
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        className={styles.input}
        type="text"
        value={city}
        onChange={e => setCity(e.target.value)}
        placeholder="Введите город..."
      />
      <button className={styles.button} type="submit">Найти</button>
    </form>
  )
}
