import React from "react";

// Вспомогательные функции для погодных кодов Open-Meteo
// https://open-meteo.com/en/docs#weather_variable_documentation
function mapWeatherCode(code) {
  const codesMap = {
    0: "Ясно",
    1: "В основном ясно",
    2: "Переменная облачность",
    3: "Пасмурно",
    45: "Туман",
    48: "Туман с изморозью",
    51: "Легкая морось",
    53: "Умеренная морось",
    55: "Сильная морось",
    61: "Небольшой дождь",
    63: "Умеренный дождь",
    65: "Сильный дождь",
    71: "Небольшой снег",
    73: "Умеренный снег",
    75: "Сильный снег",
    77: "Снежные зерна",
    80: "Небольшой ливень",
    81: "Умеренный ливень",
    82: "Сильный ливень",
    95: "Гроза",
    96: "Гроза с градом",
    99: "Сильная гроза с градом",
  };
  return codesMap[code] || "Неизвестно";
}

function CurrentWeather({ weather, cityName }) {
  if (!weather) return null;

  const temp = weather.current.temperature;
  const wind = weather.current.windspeed;
  const description = mapWeatherCode(weather.current.weathercode);

  return (
    <div
      style={{
        background: "rgba(0,0,0,0.3)",
        padding: "20px",
        borderRadius: "20px",
        margin: "20px 0",
        lineHeight: 1.6,
      }}
    >
      <div>
        <strong>{cityName}</strong>
        <br />
        {temp}°C
        <br />
        {description}
        <br />
        Ветер: {wind} км/ч
      </div>
    </div>
  );
}

export default CurrentWeather;
