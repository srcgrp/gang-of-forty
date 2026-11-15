import type { ReactNode } from "react"
import { useThemeStore } from "../hooks/useThemeStore"

type LayoutProps = {
    children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
    const theme = useThemeStore((state) => state.theme)

    return (
        <div className="app" data-theme={theme}>
            {children}
        </div>
    )
}