import { useThemeStore } from '../hooks/useThemeStore';

export default function ThemeToggle() {
  const theme = useThemeStore((state) => state.theme);
  const toggle = useThemeStore((state) => state.toggle);

  return (
    <button
      className="theme-toggle"
      type="button"
      aria-label={theme === 'light' ? 'فعال کردن تم تیره' : 'فعال کردن تم روشن'}
      aria-pressed={theme === 'dark'}
      onClick={toggle}
    >
      <i className={`ph ${theme === 'light' ? 'ph-moon' : 'ph-sun'}`} aria-hidden="true"></i>
    </button>
  );
}
