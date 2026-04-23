import React from "react";

function IntervalButtons({ selectedDays, onIntervalChange }) {
  const intervals = [
    { days: 1, label: "1 день" },
    { days: 3, label: "3 дня" },
    { days: 7, label: "7 дней" },
  ];

  return (
    <div style={{ margin: "16px 0" }}>
      <span>Прогноз: </span>
      {intervals.map(({ days, label }) => (
        <button
          key={days}
          onClick={() => onIntervalChange(days)}
          style={{
            background:
              selectedDays === days ? "#ff9800" : "rgba(255,255,255,0.3)",
            border: "none",
            padding: "8px 16px",
            margin: "4px",
            borderRadius: "30px",
            color: "white",
            cursor: "pointer",
          }}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

export default IntervalButtons;
