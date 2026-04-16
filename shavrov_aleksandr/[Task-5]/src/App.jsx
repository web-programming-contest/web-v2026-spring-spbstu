import { useEffect, useState } from 'react'
import { useWeather } from './hooks/useWeather'
import SearchBar from './components/SearchBar'
import IntervalTabs from './components/IntervalTabs'
import CurrentWeather from './components/CurrentWeather'
import ForecastGrid from './components/ForecastGrid'
import styles from './App.module.css'

export default function App() {
  const { data, cityName, loading, error, search } = useWeather()
  const [days, setDays] = useState(1)

  useEffect(() => {
    search('Moscow')
  }, [])

  return (
    <div className={styles.app}>
      <h1 className={styles.title}>Прогноз погоды</h1>

      <SearchBar onSearch={search} />
      <IntervalTabs active={days} onChange={setDays} />

      {loading && <div className={styles.status}>Загрузка...</div>}
      {error   && <div className={styles.error}>{error}</div>}

      {data && !loading && (
        <>
          <CurrentWeather data={data} cityName={cityName} />
          <ForecastGrid daily={data.daily} days={days} />
        </>
      )}
    </div>
  )
}
