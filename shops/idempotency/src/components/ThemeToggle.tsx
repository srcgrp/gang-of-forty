import { useThemeStore } from "../hooks/useThemeStore";

export default function ThemeToggle() {
  const theme = useThemeStore((state) => state.theme);
  const toggle = useThemeStore((state) => state.toggle);

  return (
    <div className="theme-toggle" role="group" aria-label="انتخاب تم">
      <button
        id="theme-light-button"
        className="theme-button"
        type="button"
        aria-label="حالت روشن"
        aria-pressed={theme === "light"}
        onClick={theme === "dark" ? toggle : undefined}
      >
        ☀
      </button>

      <button
        id="theme-dark-button"
        className="theme-button"
        type="button"
        aria-label="حالت تاریک"
        aria-pressed={theme === "dark"}
        onClick={theme === "light" ? toggle : undefined}
      >
        ☾
      </button>
    </div>
  );
}
