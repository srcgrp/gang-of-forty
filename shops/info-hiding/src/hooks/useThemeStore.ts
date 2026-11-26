import { create } from 'zustand';
import { persist } from 'zustand/middleware';
type ThemeState = { theme: 'light' | 'dark'; toggle: () => void };
export const useThemeStore = create<ThemeState>()(
    persist(set => ({
        theme: 'light',
        toggle: () => set(state => ({ theme: state.theme === 'light' ? 'dark' : 'light' }))
    }), {
        name: 'yasaman-theme',
        partialize: state => ({ theme: state.theme }),
        merge: (saved, current) => {
            if (typeof saved !== 'object' || saved === null || !('theme' in saved)) return current;
            return { ...current, theme: saved.theme === 'dark' ? 'dark' : 'light' };
        }
    })
);