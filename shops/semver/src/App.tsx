import {
  RouterProvider,
  createHashHistory,
  createRootRoute,
  createRoute,
  createRouter,
  stripSearchParams,
} from "@tanstack/react-router";
import type { ProductSort } from "./catalog/product-price";
import Layout from "./components/Layout";
import CheckoutPage from "./components/pages/CheckoutPage";
import HomePage from "./components/pages/HomePage";
import NotFound from "./components/pages/NotFound";
import PlpPage from "./components/pages/PlpPage";
import ProductPage from "./components/pages/ProductPage";

const rootRoute = createRootRoute({ component: Layout, notFoundComponent: NotFound });
const homeRoute = createRoute({ getParentRoute: () => rootRoute, path: "/", component: HomePage });
const plpRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/plp/$carouselId",
  validateSearch: (search: Record<string, unknown>): { sort: ProductSort } => ({
    sort: search.sort === "price" ? "price" : "default",
  }),
  search: { middlewares: [stripSearchParams({ sort: "default" })] },
  component: PlpPage,
});
const productRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/product/$productId",
  component: ProductPage,
});
const checkoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/checkout",
  component: CheckoutPage,
});
const router = createRouter({
  routeTree: rootRoute.addChildren([homeRoute, plpRoute, productRoute, checkoutRoute]),
  history: createHashHistory(),
  scrollRestoration: true,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
