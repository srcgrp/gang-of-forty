import { createHashHistory, createRootRoute, createRoute, createRouter, RouterProvider } from '@tanstack/react-router'
import Layout from './components/Layout'
import HomePage from './components/pages/HomePage'
import PlpPage from './components/pages/PlpPage'
import ProductPage from './components/pages/ProductPage'
import NotFound from './components/pages/NotFound'

const rootRoute = createRootRoute({ component: Layout, notFoundComponent: NotFound })
const homeRoute = createRoute({ getParentRoute: () => rootRoute, path: '/', component: HomePage })
const plpRoute = createRoute({ getParentRoute: () => rootRoute, path: '/plp/$carouselId', component: PlpPage,
  validateSearch: (search: Record<string, unknown>): { sort: 'default' | 'price' } => ({
    sort: search.sort === 'price' ? 'price' : 'default',
  }) })
const productRoute = createRoute({ getParentRoute: () => rootRoute, path: '/product/$productId', component: ProductPage })
const router = createRouter({ routeTree: rootRoute.addChildren([homeRoute, plpRoute, productRoute]), history: createHashHistory() })

declare module '@tanstack/react-router' {
  interface Register { router: typeof router }
}

export default function App() {
  return <RouterProvider router={router} />
}
