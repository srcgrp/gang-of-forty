import { Outlet } from "@tanstack/react-router";
import Status from "./Status.tsx";
import Header from "./Header.tsx";
import Footer from "./Footer.tsx";
import CartPanel from "./CartPanel.tsx";
import { useCatalog } from "../hooks/useCatalog.ts";
import { useCartTitle } from "../hooks/useCartTitle.ts";
import { useThemeStore } from "../hooks/useThemeStore.ts";

export default function Layout() {
  useCartTitle();
  const theme = useThemeStore((s) => s.theme);
  const state = useCatalog();

  if (state.status !== "success") {
    return <Status state={state} />;
  }

  const { data } = state;

  return (
    <div className="app" data-theme={theme}>
      <a
        href="#main"
        className="skip-link"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById("main")?.focus();
        }}
      >
        پرش به محتوای اصلی
      </a>
      <Header shop={data.shop} categories={data.categories} />
      <main id="main" tabIndex={-1}>
        <Outlet />
        <CartPanel />
      </main>
      <Footer shop={data.shop} categories={data.categories} />
    </div>
  );
}