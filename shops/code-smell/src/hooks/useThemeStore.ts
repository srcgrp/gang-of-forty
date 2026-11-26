import { create } from "zustand"
import { persist } from "zustand/middleware"

type Theme = "light" | "dark"

type ThemeState = {
    theme: Theme
    toggle: () => void
}

export const useThemeStore = create<ThemeState>()(
    persist(
        function (set) {
            return {
                theme: "light",
                toggle: function () {
                    set(function (state) {
                        return {
                            theme: state.theme === "light" ? "dark" : "light"
                        }
                    })
                }
            }
        },
        { name: "code-smell-theme" }
    )
)