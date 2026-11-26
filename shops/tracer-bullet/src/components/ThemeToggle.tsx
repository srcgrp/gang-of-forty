import { useThemeStore } from "../hooks/useThemeStore.ts";

export default function ThemeToggle(){
    const theme = useThemeStore ((s) => s.theme);
    const toggle = useThemeStore ((s) => s.toggle);

    return (
        <button type="button" onClick={toggle} className="theme-toggle">
            {theme}
        </button>
    );
}