import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Theme = "light" | "dark";

export interface ThemeState {
  theme: Theme;
  toggle: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: "dark",
      toggle: () =>
        set((s) => ({
          theme: s.theme === "light" ? "dark" : "light",
        })),
    }),
    {
      name: "<slug>-theme",
    },
  ),
);
