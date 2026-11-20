import {
  createHashHistory,
  createRootRoute,
  createRoute,
  createRouter,
  RouterProvider,
} from '@tanstack/react-router'
import Layout from './components/Layout.tsx'
import HomePage from './components/pages/HomePage.tsx'
import NotFound from './components/pages/NotFound.tsx'
import PlpPage from './components/pages/PlpPage.tsx'

const rootRoute = createRootRoute({ component: Layout, notFoundComponent: NotFound })
const homeRoute = createRoute({ getParentRoute: () => rootRoute, path: '/', component: HomePage })
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