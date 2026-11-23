import { Outlet } from "@tanstack/react-router";
import Header from "./Header.tsx";
import Navigation from "./Navigation.tsx";
import Footer from "./Footer.tsx";
import DocumentTitle from "./DocumentTitle.tsx";
import { useThemeStore } from "../hooks/useThemeStore.ts";
import { useSearchStore } from "../hooks/useSearchStore.ts";
import { useCatalog } from "../hooks/useCatalog.ts";

export default function Layout() {
  const theme = useThemeStore((s) => s.theme);
  const query = useSearchStore((s) => s.query);
  const setQuery = useSearchStore((s) => s.setQuery);
const { state} = useCatalog();
  return (
    <div className="app" data-theme={theme}>
      <DocumentTitle />
      <Header query={query} onQuery={setQuery} />
      <Navigation categories={state.status === "success" ? state.categories : []} />
      <main className="site-main">
        <Outlet />
      </main>
      <Footer categories={state.status === "success" ? state.categories : []} />
    </div>
  );
}