import React, { useState, useEffect } from 'react';

const Timer = () => {
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const startTimer = () => {
    if (minutes === '' || minutes === '0') {
      alert('Введите число минут!');
      return;
    }
    const totalSeconds = parseInt(minutes) * 60;
    setSeconds(totalSeconds);
    setIsRunning(true);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setSeconds(0);
    setMinutes('');
  };

  useEffect(() => {
    if (isRunning && seconds > 0) {
      const timer = setTimeout(() => {
        setSeconds(seconds - 1);
      }, 1000);
      
      return () => clearTimeout(timer);
    } else if (isRunning && seconds === 0) {
      alert('Готово!');
      setIsRunning(false);
    }
  }, [isRunning, seconds]);

  const formatTime = () => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <>
      <h1>Таймер</h1>
      
      <div style={{ fontSize: '40px', margin: '20px' }}>
        {formatTime()}
      </div>
      
      <input
        type="number"
        value={minutes}
        onChange={(e) => setMinutes(e.target.value)}
        placeholder="Введите минуты"
        disabled={isRunning}
      />
      
      <button onClick={startTimer} disabled={isRunning}>
        Запуск
      </button>
      
      <button onClick={resetTimer}>
        Сброс
      </button>
    </>
  );
};

export default Timer;