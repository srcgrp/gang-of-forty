import { useEffect, useState } from 'react'
import { toggleTheme, type Theme } from '../features/theme/rules/theme.ts'
import { loadTheme, saveTheme } from '../features/theme/storage/themeStorage.ts'

function systemTheme(): Theme {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(() => loadTheme() ?? systemTheme())

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  const handleClick = () => {
    const next = toggleTheme(theme)
    saveTheme(next)
    setTheme(next)
  }

  return (
    <button
      type="button"
      className="theme-toggle"
      aria-label={theme === 'dark' ? 'تغییر به حالت روشن' : 'تغییر به حالت تاریک'}
      onClick={handleClick}
    >
      {theme === 'dark' ? '☀' : '☾'}
    </button>
  )
}