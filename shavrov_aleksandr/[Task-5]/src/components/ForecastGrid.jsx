import { getWMO, formatDate } from '../utils/wmo'
import styles from './ForecastGrid.module.css'

export default function ForecastGrid({ daily, days }) {
  const items = daily.time.slice(0, days)

  return (
    <div className={styles.grid}>
      {items.map((date, i) => {
        const wmo = getWMO(daily.weather_code[i])
        return (
          <div key={date} className={styles.card}>
            <div className={styles.day}>{i === 0 ? 'Сегодня' : formatDate(date)}</div>
            <div className={styles.icon}>{wmo.icon}</div>
            <div className={styles.tempMax}>{Math.round(daily.temperature_2m_max[i])}°C</div>
            <div className={styles.tempMin}>{Math.round(daily.temperature_2m_min[i])}°C</div>
            <div className={styles.desc}>{wmo.label}</div>
          </div>
        )
      })}
    </div>
  )
}
