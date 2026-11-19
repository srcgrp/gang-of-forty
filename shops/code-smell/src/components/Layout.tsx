import { Link, Outlet, useLocation, useNavigate } from "@tanstack/react-router"
import { useState } from "react"
import { CatalogContext, useLoadCatalog } from "../hooks/useCatalog"
import { useThemeStore } from "../hooks/useThemeStore"
import Header from "./Header"

export default function Layout() {
    const theme = useThemeStore((state) => state.theme)
    const catalog = useLoadCatalog()
    const [categoryId, setCategoryId] = useState<number | null>(null)
    const [query, setQuery] = useState("")
    const navigate = useNavigate()
    const pathname = useLocation({ select: (location) => location.pathname })

    function onQuery(value: string): void {
        setQuery(value)
        if (value.trim() && pathname !== "/") {
            void navigate({ to: "/" })
        }
    }

    const catalogControls = { categoryId, query, onPick: setCategoryId, onQuery }
    const data = catalog.state.status === "success" ? catalog.state.data : null

    return (
        <CatalogContext.Provider value={{ ...catalog, catalogControls }}>
            <div className="app" data-theme={theme}>
                <Link
                    className="skip-link"
                    to="."
                    hash="main-content"
                    onClick={() => document.getElementById("main-content")?.focus()}
                >
                    پرش به محتوای اصلی
                </Link>
                {data && <Header data={data} catalogControls={catalogControls} />}
                <Outlet />
            </div>
        </CatalogContext.Provider>
    )
}
