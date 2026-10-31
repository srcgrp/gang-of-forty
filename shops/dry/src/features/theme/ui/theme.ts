import type { Theme } from '../rules/theme.ts'

export function findToggle(): HTMLButtonElement {
  const toggle: HTMLButtonElement | null = document.querySelector<HTMLButtonElement>('#theme-toggle')
  if (!toggle) throw new Error('index.html is missing #theme-toggle')
  return toggle
}

export function systemTheme(): Theme {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function applyTheme(toggle: HTMLButtonElement, theme: Theme): void {
  document.documentElement.dataset.theme = theme
  toggle.textContent = theme === 'dark' ? '☀' : '☾'
  toggle.setAttribute('aria-label', theme === 'dark' ? 'تغییر به حالت روشن' : 'تغییر به حالت تاریک')
}