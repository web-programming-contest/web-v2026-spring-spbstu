const GEO_API = "https://geocoding-api.open-meteo.com/v1/search";
const WEATHER_API = "https://api.open-meteo.com/v1/forecast";

export async function fetchCoordinates(cityName) {
  const url = `${GEO_API}?name=${encodeURIComponent(cityName)}&count=1&language=ru&format=json`;
  const response = await fetch(url);
  if (!response.ok) throw new Error("Ошибка координат");
  const data = await response.json();

  if (!data.results || data.results.length === 0) {
    throw new Error("Город не найден");
  }
  const result = data.results[0];
  return {
    lat: result.latitude,
    lon: result.longitude,
    name: result.name,
  };
}

export async function fetchWeather(lat, lon) {
  const url = `${WEATHER_API}?latitude=${lat}&longitude=${lon}&current_weather=true&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=7`;
  const response = await fetch(url);
  if (!response.ok) throw new Error("Ошибка получения погоды");
  const data = await response.json();

  return {
    current: data.current_weather,
    daily: data.daily,
    dailyUnits: data.daily_units,
  };
}
