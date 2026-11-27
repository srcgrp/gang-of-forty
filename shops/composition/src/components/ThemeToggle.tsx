import moonIcon from "../../icons/moon.svg";
import sunIcon from "../../icons/sun.svg";

import { useThemeStore } from "../hooks/useThemeStore";

export default function ThemeToggle() {
  const theme = useThemeStore((state) => state.theme);
  const toggle = useThemeStore((state) => state.toggle);
  const dark = theme === "dark";
  const label = dark ? "فعال کردن تم روشن" : "فعال کردن تم تیره";
  return (
    <button className="theme-toggle" type="button" onClick={toggle}
      aria-label={label} title={label}>
      <img src={dark ? sunIcon : moonIcon} alt="" width="24" height="24" />
    </button>
  );
}
