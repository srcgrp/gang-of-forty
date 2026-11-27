import { useThemeStore } from "../../hooks/useThemeStore.ts";

export default function ThemeToggle() {
  const theme = useThemeStore((s) => s.theme);
  const toggle = useThemeStore((s) => s.toggle);

  return (
    <button
      className={`theme-toggle theme-toggle-${theme}`}
      type="button"
      onClick={toggle}
    >
      {theme === "light" ? "☾" : "☀"}
    </button>
  );
}
