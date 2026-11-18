import {
  createHashHistory,
  createRootRoute,
  createRoute,
  createRouter,
  RouterProvider,
} from "@tanstack/react-router";
import Layout from "./components/Layout.tsx";
import HomePage from "./components/pages/HomePage.tsx";
import NotFound from "./components/pages/NotFound.tsx";
import PlpPage from "./components/pages/PlpPage.tsx";
import ProductPage from "./components/pages/ProductPage.tsx";
import CheckoutPage from "./components/pages/CheckoutPage.tsx";
import {
  parseSort,
  sortSearch,
} from "./scripts/logic/catalog/sort-products.ts";
import type { Sort } from "./scripts/types";

const rootRoute = createRootRoute({
  component: Layout,
  notFoundComponent: NotFound,
});
const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});
const plpRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/plp/$carouselId",
  validateSearch: (search: Record<string, unknown>): { sort?: Sort } =>
    sortSearch(parseSort(search.sort)),
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

const routeTree = rootRoute.addChildren([
  homeRoute,
  plpRoute,
  productRoute,
  checkoutRoute,
]);
const router = createRouter({ routeTree, history: createHashHistory() });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
