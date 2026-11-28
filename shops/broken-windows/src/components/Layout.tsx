import { Outlet } from "@tanstack/react-router";
import Header from "./Header.tsx";
import Navigation from "./Navigation.tsx";
import Footer from "./Footer.tsx";
import DocumentTitle from "./DocumentTitle.tsx";
import { useThemeStore } from "../hooks/useThemeStore.ts";
import { useSearchStore } from "../hooks/useSearchStore.ts";

export default function Layout() {
  const theme = useThemeStore((s) => s.theme);
  const query = useSearchStore((s) => s.query);
  const setQuery = useSearchStore((s) => s.setQuery);

  return (
    <div className="app" data-theme={theme}>
      <DocumentTitle />
      <Header query={query} onQuery={setQuery} />
      <Navigation />
      <main className="site-main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}