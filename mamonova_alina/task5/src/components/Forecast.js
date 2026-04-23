import React from "react";

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

function Forecast({ dailyData, daysCount }) {
  if (!dailyData) return null;

  const times = dailyData.time;
  const maxTemps = dailyData.temperature_2m_max;
  const minTemps = dailyData.temperature_2m_min;
  const codes = dailyData.weathercode;

  const limit = Math.min(daysCount, times.length);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
        gap: "16px",
        marginTop: "16px",
      }}
    >
      {Array.from({ length: limit }).map((_, i) => {
        const date = new Date(times[i]);
        const formattedDate = date.toLocaleDateString("ru-RU", {
          weekday: "short",
          day: "numeric",
          month: "short",
        });
        const maxTemp = Math.round(maxTemps[i]);
        const minTemp = Math.round(minTemps[i]);
        const description = mapWeatherCode(codes[i]);

        return (
          <div
            key={i}
            style={{
              background: "rgba(0,0,0,0.3)",
              padding: "16px",
              borderRadius: "16px",
              textAlign: "center",
              lineHeight: 1.5,
            }}
          >
            <div>
              <strong>{formattedDate}</strong>
            </div>
            <div>
              {maxTemp}° / {minTemp}°
            </div>
            <div>{description}</div>
          </div>
        );
      })}
    </div>
  );
}

export default Forecast;
