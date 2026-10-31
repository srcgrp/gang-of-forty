import { isTheme, type Theme } from '../rules/theme.ts'

const THEME_KEY: string = 'dry-theme'

export function loadTheme(): Theme | null {
  const saved: string | null = localStorage.getItem(THEME_KEY)
  return isTheme(saved) ? saved : null
}

export function saveTheme(theme: Theme): void {
  localStorage.setItem(THEME_KEY, theme)
}