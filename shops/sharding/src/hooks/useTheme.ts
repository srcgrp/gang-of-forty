import { useEffect, useState } from 'react'
import type { Theme } from '../shared/types'
import { loadTheme, saveTheme } from '../shared/storage/theme-storage'

export function useTheme(): [Theme, (next: Theme) => void] {
  const [theme, setTheme] = useState<Theme>(() => loadTheme())

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  useEffect(() => {
    saveTheme(theme)
  }, [theme])

  return [theme, setTheme]
}