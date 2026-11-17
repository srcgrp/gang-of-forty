import { createHashHistory, createRootRoute, createRoute, createRouter, RouterProvider } from '@tanstack/react-router'
import Layout from './components/Layout'
import HomePage from './components/pages/HomePage'
import NotFound from './components/pages/NotFound'
import PlpPage from './components/pages/PlpPage'

const rootRoute = createRootRoute({ component: Layout, notFoundComponent: NotFound })
const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  validateSearch: (search: Record<string, unknown>) => ({
    q: typeof search.q === 'string' && search.q !== '' ? search.q : undefined,
    category: typeof search.category === 'string' && search.category !== ''
      && Number.isFinite(Number(search.category)) ? Number(search.category) : undefined,
  }),
  component: HomePage,
})
const plpRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/plp/$carouselId',
  component: PlpPage,
})

const routeTree = rootRoute.addChildren([homeRoute, plpRoute])
const router = createRouter({ routeTree, history: createHashHistory() })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

export default function App() {
  return <RouterProvider router={router} />
}