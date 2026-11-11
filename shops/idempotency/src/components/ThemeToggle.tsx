import { useEffect, useState } from "react";

type Theme = "light" | "dark";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  return (
    <div className="theme-toggle" role="group" aria-label="انتخاب تم">
      <button
        id="theme-light-button"
        className="theme-button"
        type="button"
        aria-label="حالت روشن"
        aria-pressed={theme === "light"}
        onClick={() => setTheme("light")}
      >
        ☀
      </button>

      <button
        id="theme-dark-button"
        className="theme-button"
        type="button"
        aria-label="حالت تاریک"
        aria-pressed={theme === "dark"}
        onClick={() => setTheme("dark")}
      >
        ☾
      </button>
    </div>
  );
}
