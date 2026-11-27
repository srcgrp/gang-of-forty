import {
  createBrowserHistory,
  createRootRoute,
  createRoute,
  createRouter,
  RouterProvider,
} from "@tanstack/react-router";
import { Layout } from "./components/Layout";
import { HomePage } from "./components/pages/HomePage";
import { PlpPage } from "./components/pages/PlpPage";
import { ProductPage } from "./components/pages/ProductPage";
import { CheckoutPage } from "./components/pages/CheckoutPage";
import { NotFound } from "./components/pages/NotFound";

const rootRoute = createRootRoute({ component: Layout, notFoundComponent: NotFound });
const indexRoute = createRoute({ getParentRoute: () => rootRoute, path: "/", component: HomePage });
const plpRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/plp/$carouselId",
  validateSearch: (search: Record<string, unknown>): { sort: "default" | "price" } => ({
    sort: search.sort === "price" ? "price" : "default",
  }),
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

const routeTree = rootRoute.addChildren([indexRoute, plpRoute, productRoute, checkoutRoute]);
const router = createRouter({ routeTree, history: createBrowserHistory() });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
