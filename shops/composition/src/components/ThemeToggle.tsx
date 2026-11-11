import moonIcon from "../../icons/moon.svg";
import sunIcon from "../../icons/sun.svg";

type Props = { dark: boolean; onToggle: () => void };
export default function ThemeToggle({ dark, onToggle }: Props) {
  const label = dark ? "فعال کردن تم روشن" : "فعال کردن تم تیره";
  return (
    <button className="theme-toggle" type="button" onClick={onToggle}
      aria-label={label} title={label}>
      <img src={dark ? sunIcon : moonIcon} alt="" width="24" height="24" />
    </button>
  );
}
