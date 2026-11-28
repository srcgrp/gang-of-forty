import {
  createHashHistory,
  createRootRoute,
  createRoute,
  createRouter,
  RouterProvider,
} from '@tanstack/react-router'

import Layout from './components/Layout'
import HomePage from './components/pages/HomePage'
import PlpPage from './components/pages/PlpPage'
import ProductDetailPage from './components/pages/ProductDetailPage'
import NotFound from './components/pages/NotFound'
import CheckoutPage from './components/pages/CheckoutPage'

const hashHistory = createHashHistory()

const rootRoute = createRootRoute({
  component: Layout,
  notFoundComponent: NotFound,
})

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
})

const plpRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/plp/$carouselId',
  validateSearch: (search: Record<string, unknown>) => ({
    sort: search.sort === 'price' ? 'price' as const : 'default' as const,
  }),
  component: PlpPage,
})

const productDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/product/$productId',
  component: ProductDetailPage,
})

const checkoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/checkout',
  component: CheckoutPage,
})
const routeTree = rootRoute.addChildren([
  homeRoute,
  plpRoute,
  productDetailRoute,
  checkoutRoute,
])

const router = createRouter({
  routeTree,
  history: hashHistory,
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

export default function App() {
  return <RouterProvider router={router} />
}