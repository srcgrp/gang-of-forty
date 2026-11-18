import { useThemeStore } from '../hooks/useThemeStore'
import { FiMoon, FiSun } from 'react-icons/fi'


export default function ThemeToggle() {
  const theme = useThemeStore((s) => s.theme)
  const toggle = useThemeStore((s) => s.toggle)
  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggle}
      aria-label={theme === 'light' ? 'فعال کردن تم تاریک' : 'فعال کردن تم روشن'}
    >
      {theme === 'light' ? <FiMoon aria-hidden="true" /> : <FiSun aria-hidden="true" />}
    </button>
  )
}