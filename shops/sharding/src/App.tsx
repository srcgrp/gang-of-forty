import {
  createHashHistory,
  createRootRoute,
  createRoute,
  createRouter,
  RouterProvider,
} from '@tanstack/react-router'
import Layout from './components/Layout'
import CheckoutPage from './components/pages/CheckoutPage'
import HomePage from './components/pages/HomePage'
import NotFound from './components/pages/NotFound'
import PlpPage from './components/pages/PlpPage'
import ProductPage from './components/pages/ProductPage'
import { validateShopSearch } from './shared/storage/url'
import type { CarouselSort } from './shared/types'

const rootRoute = createRootRoute({
  component: Layout,
  notFoundComponent: NotFound,
  validateSearch: validateShopSearch,
})
const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
})
const plpRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/plp/$carouselId',
  component: PlpPage,
  validateSearch: (search: Record<string, unknown>): { sort: CarouselSort } => ({
    sort: search.sort === 'price' ? 'price' : 'default',
  }),
})
const productRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/product/$productId',
  component: ProductPage,
})
const checkoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/checkout',
  component: CheckoutPage,
})
const routeTree = rootRoute.addChildren([homeRoute, plpRoute, productRoute, checkoutRoute])
const router = createRouter({ routeTree, history: createHashHistory(), scrollRestoration: true })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

export default function App() {
  return <RouterProvider router={router} />
}
