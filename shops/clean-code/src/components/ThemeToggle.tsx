import { useThemeStore } from "../hooks/useThemeStore";

export default function ThemeToggle() {
  const theme = useThemeStore((s) => s.theme);
  const toggle = useThemeStore((s) => s.toggle);

  return (
    <button type="button" className="theme-toggle" onClick={toggle}>
      {theme === "light" ? "تیره" : "روشن"}
    </button>
  );
}
