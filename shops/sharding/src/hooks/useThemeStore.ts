import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { isRecord } from '../shared/api/is-record'
import { isTheme, type Theme } from '../shared/types'

type ThemeState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'auto',
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: 'sharding-theme',
      partialize: (state) => ({ theme: state.theme }),
      merge: (stored, current) =>
        isRecord(stored) && isTheme(stored.theme)
          ? { ...current, theme: stored.theme }
          : current,
    },
  ),
)
