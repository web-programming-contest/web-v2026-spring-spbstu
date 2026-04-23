import React, { useState, useEffect, useCallback } from "react";
import { fetchCoordinates, fetchWeather } from "./services/weatherApi.js";
import SearchBar from "./components/SearchBar.js";
import IntervalButtons from "./components/IntervalButtons.js";
import CurrentWeather from "./components/CurrentWeather.js";
import Forecast from "./components/Forecast.js";
import "./styles.css";

function App() {
  const [cityName, setCityName] = useState("Москва");
  const [weatherData, setWeatherData] = useState(null);
  const [selectedDays, setSelectedDays] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadWeather = useCallback(async (city) => {
    setLoading(true);
    setError(null);
    try {
      const coords = await fetchCoordinates(city);
      const weather = await fetchWeather(coords.lat, coords.lon);
      setCityName(coords.name);
      setWeatherData(weather);
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadWeather("Москва").catch((err) => {
      console.error("Ошибка загрузки погоды:", err);
    });
  }, [loadWeather]);

  const handleSearch = (city) => {
    loadWeather(city).catch((err) => {
      console.error("Ошибка загрузки погоды:", err);
    });
  };

  const handleIntervalChange = (days) => {
    setSelectedDays(days);
  };

  return (
    <div className="app">
      <h1>Погода</h1>

      <SearchBar onSearch={handleSearch} isLoading={loading} />

      <IntervalButtons
        selectedDays={selectedDays}
        onIntervalChange={handleIntervalChange}
      />

      {error && <div className="error-msg">{error}</div>}

      {weatherData && (
        <>
          <CurrentWeather weather={weatherData} cityName={cityName} />

          <h2>Прогноз</h2>
          <Forecast dailyData={weatherData.daily} daysCount={selectedDays} />
        </>
      )}
    </div>
  );
}

export default App;
