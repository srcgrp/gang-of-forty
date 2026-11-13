import { useThemeStore } from "../hooks/useThemeStore";

export default function ThemeToggle() {
  const theme = useThemeStore((s) => s.theme);
  const toggle = useThemeStore((s) => s.toggle);

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggle}
      aria-label={theme === "light" ? "فعال کردن تم تاریک" : "فعال کردن تم روشن"}
      title={theme === "light" ? "تم تاریک" : "تم روشن"}
    >
      {theme === "light" ? "🌙" : "☀️"}
    </button>
  );
}