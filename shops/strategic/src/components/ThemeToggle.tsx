import { useThemeStore } from '../hooks/useThemeStore';

export default function ThemeToggle() {
  const theme = useThemeStore((s) => s.theme);
  const toggle = useThemeStore((s) => s.toggle);
  const dark = theme === 'dark';
  return (
    <button className="theme-toggle" type="button" onClick={toggle}>
      <svg className="icon" aria-hidden="true" focusable="false"><use href={dark ? '#i-sun' : '#i-moon'} /></svg>
      <span className="theme-toggle__label">{dark ? 'حالت روشن' : 'حالت تیره'}</span>
    </button>
  );
}