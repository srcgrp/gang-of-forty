import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Theme = 'light' | 'dark';
type ThemeState = { theme: Theme; toggle: () => void };

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'light',
      toggle: () => set((s) => ({ theme: s.theme === 'light' ? 'dark' : 'light' })),
    }),
    { name: 'strategic-theme' },
  ),
);