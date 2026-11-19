import { useId } from 'react'
import { useThemeStore } from '../hooks/useThemeStore'
import type { Theme } from '../shared/types'

const OPTIONS: { value: Theme; icon: string; label: string }[] = [
  { value: 'auto', icon: 'themeAuto', label: 'پیروی از سیستم' },
  { value: 'light', icon: 'themeLight', label: 'حالت روشن' },
  { value: 'dark', icon: 'themeDark', label: 'حالت تاریک' },
]

export default function ThemeToggle() {
  const theme = useThemeStore((state) => state.theme)
  const setTheme = useThemeStore((state) => state.setTheme)
  const groupId = useId()

  return (
    <div className="theme-switch" role="radiogroup" aria-label="انتخاب پوسته">
      {OPTIONS.map((opt) => (
        <div key={opt.value} className="theme-switch__item">
          <input
            type="radio"
            name={groupId}
            id={`${groupId}-${opt.value}`}
            value={opt.value}
            className="theme-switch__input"
            checked={theme === opt.value}
            onChange={() => setTheme(opt.value)}
          />
          <label htmlFor={`${groupId}-${opt.value}`} className="theme-switch__label" title={opt.label}>
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
