export type Theme = 'light' | 'dark'

export function isTheme(x: unknown): x is Theme {
  return x === 'light' || x === 'dark'
}

export function toggleTheme(theme: Theme): Theme {
  return theme === 'dark' ? 'light' : 'dark'
}