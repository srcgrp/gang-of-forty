import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { toggleTheme, type Theme } from '../features/theme/rules/theme.ts'

type ThemeState = { theme: Theme; toggle: () => void }

export const useThemeStore = create<ThemeState>()(
    persist(
        (set) => ({
            theme: window.matchMedia('(perfers-color-scheme: dark').matches ? 'dark' : 'light',
            toggle: () => set((s) => ({ theme: toggleTheme(s.theme) })),
        }),
        { name: 'dry-theme' },
    ),
)