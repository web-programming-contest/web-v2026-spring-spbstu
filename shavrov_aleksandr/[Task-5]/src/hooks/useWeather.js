import { useState, useCallback } from 'react'
import { geocodeCity, fetchWeather } from '../api/weather'

export function useWeather() {
  const [data, setData]         = useState(null)
  const [cityName, setCityName] = useState('')
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState(null)

  const search = useCallback(async (city) => {
    if (!city.trim()) return
    setLoading(true)
    setError(null)
    try {
      const geo = await geocodeCity(city)
      const weather = await fetchWeather(geo.latitude, geo.longitude)
      setCityName(`${geo.name}${geo.country ? ', ' + geo.country : ''}`)
      setData(weather)
    } catch (err) {
      setError(err.message)
      setData(null)
    } finally {
      setLoading(false)
    }
  }, [])

  return { data, cityName, loading, error, search }
}
