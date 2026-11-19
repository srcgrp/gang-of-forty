import { useThemeStore } from '../hooks/useThemeStore'

export default function ThemeToggle() {
    const theme = useThemeStore(s => s.theme)
    const toggle = useThemeStore(s => s.toggle)
    return <button className="theme-toggle" type="button" onClick={toggle}>{theme === 'light' ? 'تم تاریک' : 'تم روشن'}</button>
}
