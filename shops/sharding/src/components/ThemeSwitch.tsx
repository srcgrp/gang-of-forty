export default function ThemeSwitch() {
  return (
    <div className="theme-switch" role="radiogroup" aria-label="انتخاب پوسته">
      <input
        type="radio"
        name="theme-header"
        id="theme-header-auto"
        value="auto"
        className="theme-switch__input"
        defaultChecked
      />
      <label htmlFor="theme-header-auto" className="theme-switch__label" title="پیروی از سیستم">
        <span className="visually-hidden">پیروی از تنظیمات سیستم</span>
        <svg className="theme-switch__icon" aria-hidden="true">
          <use href="./icons.svg#themeAuto" />
        </svg>
      </label>

      <input
        type="radio"
        name="theme-header"
        id="theme-header-light"
        value="light"
        className="theme-switch__input"
      />
      <label htmlFor="theme-header-light" className="theme-switch__label" title="حالت روشن">
        <span className="visually-hidden">حالت روشن</span>
        <svg className="theme-switch__icon" aria-hidden="true">
          <use href="./icons.svg#themeLight" />
        </svg>
      </label>

      <input
        type="radio"
        name="theme-header"
        id="theme-header-dark"
        value="dark"
        className="theme-switch__input"
      />
      <label htmlFor="theme-header-dark" className="theme-switch__label" title="حالت تاریک">
        <span className="visually-hidden">حالت تاریک</span>
        <svg className="theme-switch__icon" aria-hidden="true">
          <use href="./icons.svg#themeDark" />
        </svg>
      </label>
    </div>
  )
}