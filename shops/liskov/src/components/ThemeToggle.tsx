import {useThemeStore} from '../hooks/useThemeStore';

export default function ThemeToggle() {
    const theme = useThemeStore((state) => state.theme);
    const toggle = useThemeStore((state) => state.toggle);

    return (
        <button
            type='button'
            className='theme-toggle'
            onClick={toggle}
            aria-label={
                theme === 'light'
                    ? 'Switch to dark mode'
                    : 'Switch to light mode'
            }
            title={theme === 'light' ? 'Dark mode' : 'Light mode'}
        >
            {theme === 'light' ? '🌙' : '☀️'}
        </button>
    );
}
