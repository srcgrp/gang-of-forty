
import { createHashHistory } from "@tanstack/react-router";
import { createRootRoute } from "@tanstack/react-router";
import { createRoute } from "@tanstack/react-router";
import { createRouter } from "@tanstack/react-router";
import { RouterProvider } from "@tanstack/react-router";
import Layout from "./components/Layout.tsx";
import PlpPage from "./components/pages/PlpPage.tsx";
import HomePage from "./components/pages/HomePage.tsx";
import NotFound from "./components/pages/NotFound.tsx";
import ProductPage from "./components/pages/ProductPage.tsx";
const rootRoute = createRootRoute({ component: Layout, notFoundComponent: NotFound });
const homeRoute = createRoute({ getParentRoute: () => rootRoute, path: "/", component: HomePage });
const plpRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/plp/$carouselId",
   validateSearch: (
    search: Record<string, unknown>
  ): { sort: "default" | "price" } => ({
    sort: search.sort === "price" ? "price" : "default",
  }),
  component: PlpPage,

});
const productRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/product/$productId",
  component: ProductPage,
});
const routeTree = rootRoute.addChildren([homeRoute, plpRoute , productRoute]);
const router = createRouter({ routeTree, history: createHashHistory() });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
export default function App() {
  return <RouterProvider router={router} />;


}
