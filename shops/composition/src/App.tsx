import { createHashHistory, createRootRoute, createRoute, createRouter, lazyRouteComponent, RouterProvider } from "@tanstack/react-router";
import Layout from "./components/Layout";
import HomePage from "./components/pages/HomePage";
import NotFound from "./components/pages/NotFound";

const rootRoute = createRootRoute({ component: Layout, notFoundComponent: NotFound });
const homeRoute = createRoute({ getParentRoute: () => rootRoute, path: "/", component: HomePage });
const plpRoute = createRoute({
  getParentRoute: () => rootRoute, path: "/plp/$carouselId",
  component: lazyRouteComponent(() => import("./components/pages/PlpPage")),
  validateSearch: (search: Record<string, unknown>): { sort: "default" | "price" } => ({
    sort: search.sort === "price" ? "price" : "default",
  }),
});
const productRoute = createRoute({
  getParentRoute: () => rootRoute, path: "/product/$productId",
  component: lazyRouteComponent(() => import("./components/pages/ProductPage")),
});
const checkoutRoute = createRoute({
  getParentRoute: () => rootRoute, path: "/checkout",
  component: lazyRouteComponent(() => import("./components/pages/CheckoutPage")),
});
const routeTree = rootRoute.addChildren([homeRoute, plpRoute, productRoute, checkoutRoute]);
const router = createRouter({ routeTree, history: createHashHistory(), scrollRestoration: true });

declare module "@tanstack/react-router" {
  interface Register { router: typeof router; }
}
export default function App() {
  return <RouterProvider router={router} />;
}
