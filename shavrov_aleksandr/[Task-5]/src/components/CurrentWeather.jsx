import { getWMO, formatDate } from '../utils/wmo'
import styles from './CurrentWeather.module.css'

export default function CurrentWeather({ data, cityName }) {
  const cur = data.current
  const wmo = getWMO(cur.weather_code)
  const pressure = cur.surface_pressure != null
    ? `${Math.round(cur.surface_pressure * 0.750062)} мм`
    : '—'
  const visibility = cur.visibility != null
    ? `${(cur.visibility / 1000).toFixed(1)} км`
    : '—'

  return (
    <div className={styles.card}>
      <div className={styles.city}>{cityName}</div>
      <div className={styles.date}>{formatDate(cur.time, true)}</div>
      <div className={styles.icon}>{wmo.icon}</div>
      <div className={styles.temp}>{Math.round(cur.temperature_2m)}°C</div>
      <div className={styles.feelsLike}>
        Ощущается как {Math.round(cur.apparent_temperature)}°C
      </div>
      <div className={styles.desc}>{wmo.label}</div>

      <div className={styles.details}>
        <DetailItem label="Влажность"  value={`${cur.relative_humidity_2m}%`} />
        <DetailItem label="Ветер"      value={`${Math.round(cur.wind_speed_10m)} км/ч`} />
        <DetailItem label="Видимость"  value={visibility} />
        <DetailItem label="Давление"   value={pressure} />
      </div>
    </div>
  )
}

function DetailItem({ label, value }) {
  return (
    <div className={styles.detailItem}>
      <span className={styles.detailLabel}>{label}</span>
      <span className={styles.detailValue}>{value}</span>
    </div>
  )
}
