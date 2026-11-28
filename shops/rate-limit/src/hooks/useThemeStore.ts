import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ThemeState } from '../types';

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'light',
      toggle: () => set((s) => ({ theme: s.theme === 'light' ? 'dark' : 'light' })),
    }),
    { name: 'rate-limit-theme' },
  ),
);
