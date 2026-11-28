import {create} from 'zustand';
import {persist} from 'zustand/middleware';

import type {Theme} from '../types';

type ThemeState = {
    theme: Theme;
    toggle: () => void;
};

export const useThemeStore = create<ThemeState>()(
    persist(
        (set) => ({
            theme: 'light',
            toggle: () =>
                set((state) => ({
                    theme: state.theme === 'light' ? 'dark' : 'light',
                })),
        }),
        {name: 'liskov-theme'},
    ),
);
