import { StrictMode } from 'react'
// Импортирует специальный компонент StrictMode из React

// Он помогает находить потенциальные проблемы в коде (не влияет на продакшен)
import { createRoot } from 'react-dom/client'
// Импортирует функцию для создания "корня" React-приложения

// Это мост между React и реальным DOM (HTML)
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
// render( Говорит React: "отрисуй приложение в найденный корень"

// <StrictMode> оборачивает приложение для дополнительных проверок

// <App /> — ваш главный компонент