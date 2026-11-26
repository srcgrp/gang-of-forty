import { useThemeStore } from "../hooks/useThemeStore";

export default function ThemeToggle() {
  const theme = useThemeStore((state) => state.theme);
  const toggle = useThemeStore((state) => state.toggle);

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggle}
      aria-label={theme === "light" ? "فعال‌کردن حالت تیره" : "فعال‌کردن حالت روشن"}
      aria-pressed={theme === "dark"}
      title={theme === "light" ? "حالت تیره" : "حالت روشن"}
    >
      <svg className="theme-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        {theme === "light" ? (
          <>
            <circle cx="12" cy="12" r="4" />
            <path d="M11 1h2v3h-2zm0 19h2v3h-2zm9-9h3v2h-3zM1 11h3v2H1zm2.6-6.99 1.42-1.42 2.12 2.12-1.42 1.42zm14.14 14.14 1.42-1.42 2.12 2.12-1.42 1.42zM18.16 4.7l2.12-2.12 1.42 1.42-2.12 2.12zM4.02 18.84l2.12-2.12 1.42 1.42-2.12 2.12z" />
          </>
        ) : (
          <path d="M9.598 3.004A8.985 8.985 0 0 0 12 21a9.005 9.005 0 0 0 8.943-7.993 7 7 0 0 1-11.49-6.427 7 7 0 0 1 .145-3.576Z" />
        )}
      </svg>
    </button>
  );
}
