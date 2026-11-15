import { useThemeStore } from '../hooks/useThemeStore.ts'

export default function ThemeToggle() {
  const theme = useThemeStore((s) => s.theme)
  const toggle = useThemeStore((s) => s.toggle)

  return (
    <button
      type="button"
      className="theme-toggle"
      aria-label={theme === 'dark' ? 'تغییر به حالت روشن' : 'تغییر به حالت تاریک'}
      onClick={toggle}
    >
      {theme === 'dark' ? '☀' : '☾'}
    </button>
  )
}