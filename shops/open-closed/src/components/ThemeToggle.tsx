import { useThemeStore } from '../hooks/useThemeStore.ts'

export default function ThemeToggle() {
  const theme = useThemeStore((s) => s.theme)
  const toggle = useThemeStore((s) => s.toggle)

  return (
    <button
      className="theme-toggle"
      type="button"
      onClick={toggle}
      aria-label={theme === 'light' ? 'تغییر به تم تیره' : 'تغییر به تم روشن'}
    >
      <span aria-hidden="true">{theme === 'light' ? '🌙' : '☀️'}</span>
      <span className="theme-label">{theme === 'light' ? 'تم تیره' : 'تم روشن'}</span>
    </button>
  )
}