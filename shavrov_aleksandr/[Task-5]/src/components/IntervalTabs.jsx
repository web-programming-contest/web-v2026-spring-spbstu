import styles from './IntervalTabs.module.css'

const TABS = [
  { days: 1, label: 'Сегодня' },
  { days: 3, label: '3 дня' },
  { days: 7, label: '7 дней' },
]

export default function IntervalTabs({ active, onChange }) {
  return (
    <div className={styles.tabs}>
      {TABS.map(({ days, label }) => (
        <button
          key={days}
          className={`${styles.tab} ${active === days ? styles.active : ''}`}
          onClick={() => onChange(days)}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
