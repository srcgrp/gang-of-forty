import { useThemeStore } from "../hooks/useThemeStore";

export default function ThemeToggle() {
    const theme = useThemeStore((s) => s.theme)
    const toggle = useThemeStore((s) => s.toggle)
    return (
        <button onClick= {toggle} type="button">
            {theme === "light" ? "تم تیره" : "تم روشن"}
        </button>
    )
}