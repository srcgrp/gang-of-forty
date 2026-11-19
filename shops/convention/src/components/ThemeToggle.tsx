import { useThemeStore } from '../hooks/useThemeStore'

export default function ThemeToggle() {
  const theme = useThemeStore((state) => state.theme)
  const toggle = useThemeStore((state) => state.toggle)
  return <button type="button" onClick={toggle} aria-pressed={theme === 'dark'}>
    {theme === 'light' ? '🌙 تم تیره' : '☀️ تم روشن'}
  </button>
}
