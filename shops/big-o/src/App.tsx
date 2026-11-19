import {
  createHashHistory,
  createRootRoute,
  createRoute,
  createRouter,
  RouterProvider,
} from "@tanstack/react-router"
import type { SearchSchemaInput } from "@tanstack/react-router"
import Layout from "./components/Layout"
import HomePage from "./components/pages/HomePage"
import NotFound from "./components/pages/NotFound"
import PlpPage from "./components/pages/PlpPage"
import { toSortOption } from "./catalog/sortProducts"
import type { SortOption } from "./types"

// What a Link may send: sort is optional and can be anything (it comes from the URL)
type PlpSearchInput = { sort?: unknown } & SearchSchemaInput
// What the page gets after validateSearch: always a valid sort
type PlpSearch = { sort: SortOption }

const rootRoute = createRootRoute({ component: Layout, notFoundComponent: NotFound })
const homeRoute = createRoute({ getParentRoute: () => rootRoute, path: "/", component: HomePage })
const plpRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/plp/$carouselId",
  // ?sort=price is checked here, so a wrong value in the URL becomes "default"
  validateSearch: (search: PlpSearchInput): PlpSearch => ({ sort: toSortOption(search.sort) }),
  component: PlpPage,
})

const routeTree = rootRoute.addChildren([homeRoute, plpRoute])
const router = createRouter({ routeTree, history: createHashHistory() })

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router
  }
}

export default function App() {
  return <RouterProvider router={router} />
}