import { useThemeStore } from "../hooks/useThemeStore"

export default function ThemeToggle() {
    const theme = useThemeStore((state) => state.theme)
    const toggle = useThemeStore((state) => state.toggle)
    const label = theme === "light" ? "فعال کردن حالت تیره" : "فعال کردن حالت روشن"
    const icon = theme === "light" ? "svg/sun.svg" : "svg/moon.svg"

    return (
        <button
            className="cart-button theme-toggle"
            type="button"
            onClick={toggle}
            aria-label={label}
            title={label}
        >
            <img
                src={icon}
                alt=""
                width={20}
                height={20}
                aria-hidden="true"
            />
        </button>
    )
}