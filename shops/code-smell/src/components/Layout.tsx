import { Link, Outlet, useLocation, useNavigate } from "@tanstack/react-router"
import { useEffect, useState } from "react"
import { cartCount } from "../cart/cartRules"
import { CatalogContext, useLoadCatalog } from "../hooks/useCatalog"
import { useCartStore } from "../hooks/useCartStore"
import { useThemeStore } from "../hooks/useThemeStore"
import CartPanel from "./CartPanel"
import Header from "./Header"

export default function Layout() {
    const theme = useThemeStore((state) => state.theme)
    const catalog = useLoadCatalog()
    const [categoryId, setCategoryId] = useState<number | null>(null)
    const [query, setQuery] = useState("")
    const count = useCartStore((store) => cartCount(store.cart))
    const navigate = useNavigate()
    const pathname = useLocation({ select: (location) => location.pathname })

    useEffect(function () {
        document.title = "بوی کد | سبد خرید: " + count.toLocaleString("fa-IR") + " کالا"
    }, [count])

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
                {data && (
                    <Header categories={data.categories} shop={data.shop} catalogControls={catalogControls} />
                )}
                <Outlet />
                {data && (
                    <CartPanel products={data.products} offers={data.offers} stock={data.stock.items} />
                )}
            </div>
        </CatalogContext.Provider>
    )
}