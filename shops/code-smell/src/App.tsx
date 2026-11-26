import {
    createHashHistory,
    createRootRoute,
    createRoute,
    createRouter,
    RouterProvider
} from "@tanstack/react-router"
import type { ListingSearch } from "./catalog/shopPageData"
import Layout from "./components/Layout"
import CheckoutPage from "./components/pages/CheckoutPage"
import HomePage from "./components/pages/HomePage"
import NotFound from "./components/pages/NotFound"
import PlpPage from "./components/pages/PlpPage"
import ProductPage from "./components/pages/ProductPage"

const rootRoute = createRootRoute({
    component: Layout,
    notFoundComponent: NotFound
})

const homeRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/",
    component: HomePage
})

function readListingSearch(params: Record<string, unknown>): ListingSearch {
    const search: ListingSearch = { sort: params.sort === "price" ? "price" : "default" }
    if (typeof params.q === "string" || typeof params.q === "number") search.q = String(params.q)
    if (typeof params.cat === "number") search.cat = params.cat
    return search
}

const plpRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/plp/$carouselId",
    validateSearch: readListingSearch,
    component: PlpPage
})

const productRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/product/$productId",
    component: ProductPage
})

const checkoutRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/checkout",
    component: CheckoutPage
})

const router = createRouter({
    routeTree: rootRoute.addChildren([homeRoute, plpRoute, productRoute, checkoutRoute]),
    history: createHashHistory()
})

declare module "@tanstack/react-router" {
    interface Register {
        router: typeof router
    }
}

export default function App() {
    return <RouterProvider router={router} />
}