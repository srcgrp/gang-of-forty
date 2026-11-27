import { useThemeStore } from "../hooks/useThemeStore";

export default function ThemeToggle() {
    const theme = useThemeStore((s) => s.theme)
    const toggle = useThemeStore((s) => s.toggle)
    return (
        <button className="theme-toggle" onClick= {toggle} type="button">
            <span aria-hidden="true">{theme === "light" ? "🌙" : "☀️"}</span>
            {theme === "light" ? "تم تیره" : "تم روشن"}
        </button>
    )
}