import { createHashHistory, createRootRoute, createRoute, createRouter, RouterProvider } from '@tanstack/react-router';
import ProductPage from './components/pages/ProductPage';
import CheckoutPage from './components/pages/CheckoutPage';
import type { PriceSort } from './catalog/sort-products';
import Layout from './components/Layout';
import HomePage from './components/pages/HomePage';
import PlpPage from './components/pages/PlpPage';
import NotFound from './components/pages/NotFound';

const rootRoute = createRootRoute({
  component: Layout,
  notFoundComponent: NotFound,
  validateSearch: (search: Record<string, unknown>): { q?: string } =>
    typeof search.q === 'string' && search.q.trim() ? { q: search.q } : {},
});
const homeRoute = createRoute({
  getParentRoute: () => rootRoute, path: '/', component: HomePage,
  validateSearch: (search: Record<string, unknown>): { category?: string } =>
    typeof search.category === 'string' && search.category ? { category: search.category } : {},
});
const plpRoute = createRoute({ getParentRoute: () => rootRoute, path: '/plp/$carouselId', component: PlpPage,
  validateSearch: (search: Record<string, unknown>): { sort: PriceSort } => ({
    sort: search.sort === 'price' ? 'price' : 'default',
  }),
});
const productRoute = createRoute({ getParentRoute: () => rootRoute, path: '/product/$productId', component: ProductPage });
const checkoutRoute = createRoute({ getParentRoute: () => rootRoute, path: '/checkout', component: CheckoutPage });
const routeTree = rootRoute.addChildren([homeRoute, plpRoute, productRoute, checkoutRoute]);
const router = createRouter({ routeTree, history: createHashHistory() });

declare module '@tanstack/react-router' {
  interface Register { router: typeof router }
}

export default function App() {
  return <RouterProvider router={router} />;
}
