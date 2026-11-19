import type { ReactNode } from 'react'
import { useThemeStore } from '../hooks/useThemeStore'

export default function ThemeToggle(): ReactNode {
  const theme = useThemeStore((state) => state.theme)
  const toggle = useThemeStore((state) => state.toggle)

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggle}
      aria-label={theme === 'light' ? 'فعال کردن حالت تاریک' : 'فعال کردن حالت روشن'}
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  )
}
