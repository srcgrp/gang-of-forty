import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Theme } from '../types.ts'

type ThemeState = {
  theme: Theme
  toggle: () => void
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'light',
      toggle: () => set((s) => ({ theme: s.theme === 'light' ? 'dark' : 'light' })),
    }),
    { name: 'open-closed-theme' }, // کلید ذخیره در localStorage
  ),
)