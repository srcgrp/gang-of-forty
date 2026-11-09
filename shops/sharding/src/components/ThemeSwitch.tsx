import type { Theme } from '../shared/types'

const OPTIONS: { value: Theme; icon: string; label: string }[] = [
  { value: 'auto', icon: 'themeAuto', label: 'پیروی از سیستم' },
  { value: 'light', icon: 'themeLight', label: 'حالت روشن' },
  { value: 'dark', icon: 'themeDark', label: 'حالت تاریک' },
]

type ThemeSwitchProps = {
  value: Theme
  onChange: (next: Theme) => void
}

export default function ThemeSwitch({ value, onChange }: ThemeSwitchProps) {
  return (
    <div className="theme-switch" role="radiogroup" aria-label="انتخاب پوسته">
      {OPTIONS.map((opt) => (
        <div key={opt.value} className="theme-switch__item">
          <input
            type="radio"
            name="theme"
            id={`theme-${opt.value}`}
            value={opt.value}
            className="theme-switch__input"
            checked={value === opt.value}
            onChange={() => onChange(opt.value)}
          />
          <label htmlFor={`theme-${opt.value}`} className="theme-switch__label" title={opt.label}>
            <span className="visually-hidden">{opt.label}</span>
            <svg className="theme-switch__icon" aria-hidden="true">
              <use href={`./icons.svg#${opt.icon}`} />
            </svg>
          </label>
        </div>
      ))}
    </div>
  )
}