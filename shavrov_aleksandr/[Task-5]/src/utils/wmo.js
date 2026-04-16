const WMO = {
  0:  { label: 'Ясно',                    icon: '☀️' },
  1:  { label: 'Преимущественно ясно',    icon: '🌤️' },
  2:  { label: 'Переменная облачность',   icon: '⛅' },
  3:  { label: 'Пасмурно',               icon: '☁️' },
  45: { label: 'Туман',                   icon: '🌫️' },
  48: { label: 'Туман с изморозью',       icon: '🌫️' },
  51: { label: 'Слабая морось',           icon: '🌦️' },
  53: { label: 'Морось',                  icon: '🌦️' },
  55: { label: 'Сильная морось',          icon: '🌧️' },
  61: { label: 'Слабый дождь',            icon: '🌧️' },
  63: { label: 'Дождь',                   icon: '🌧️' },
  65: { label: 'Сильный дождь',           icon: '🌧️' },
  71: { label: 'Слабый снег',             icon: '🌨️' },
  73: { label: 'Снег',                    icon: '❄️' },
  75: { label: 'Сильный снег',            icon: '❄️' },
  80: { label: 'Ливень',                  icon: '🌦️' },
  81: { label: 'Сильный ливень',          icon: '🌧️' },
  82: { label: 'Очень сильный ливень',    icon: '⛈️' },
  95: { label: 'Гроза',                   icon: '⛈️' },
  96: { label: 'Гроза с градом',          icon: '⛈️' },
  99: { label: 'Сильная гроза',           icon: '⛈️' },
}

export function getWMO(code) {
  return WMO[code] ?? { label: 'Неизвестно', icon: '🌡️' }
}

export function formatDate(isoStr, withTime = false) {
  const d = new Date(isoStr)
  const opts = { weekday: 'short', day: 'numeric', month: 'long' }
  if (withTime) { opts.hour = '2-digit'; opts.minute = '2-digit' }
  return d.toLocaleDateString('ru-RU', opts)
}
