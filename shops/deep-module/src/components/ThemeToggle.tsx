import { useThemeStore } from "../hooks/useThemeStore";
import { ThemeIcon } from "./ThemeIcon";

export function ThemeToggle() {
  const theme = useThemeStore((s) => s.theme);
  const toggle = useThemeStore((s) => s.toggle);
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      className="theme-btn"
      onClick={toggle}
      aria-label="تغییر حالت روشن و تاریک"
      aria-pressed={isDark}
    >
      <span className="theme-btn__icon">
        <ThemeIcon dark={isDark} />
      </span>
    </button>
  );
}
