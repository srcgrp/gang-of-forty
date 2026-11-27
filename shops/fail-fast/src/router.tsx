/**
 * Code-based TanStack Router with hash history.
 */
import {
  createHashHistory,
  createRootRoute,
  createRoute,
  createRouter,
} from '@tanstack/react-router'
import App from './App'
import HomePage from './components/pages/HomePage'
import NotFoundPage from './components/pages/NotFoundPage'
import ProductListingPage from './components/pages/ProductListingPage'

const rootRoute = createRootRoute({
  component: App,
  notFoundComponent: NotFoundPage,
})

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
})

const productListingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'plp/$carouselId',
  component: ProductListingPage,
})

const routeTree = rootRoute.addChildren([homeRoute, productListingRoute])

export const router = createRouter({
  routeTree,
  history: createHashHistory(),
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
