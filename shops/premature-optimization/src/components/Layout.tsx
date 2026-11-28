import { Outlet } from "@tanstack/react-router";
import type { CatalogData } from "../scripts/types";
import { useCatalog } from "../hooks/useCatalog.ts";
import { useThemeStore } from "../hooks/useThemeStore.ts";
import DocumentTitle from "./layout/DocumentTitle.tsx";
import Footer from "./layout/Footer.tsx";
import Header from "./layout/Header.tsx";
import AnchorLink from "./shared/AnchorLink.tsx";

const BRAND = {
  name: "سوپرینو",
  copyright: "© ۱۴۰۵ سوپرینو · عضو دار و دسته چهل‌نفره",
};

function Frame({ data }: { data: CatalogData }) {
  const { products, offers, categories } = data;
  const shop = { ...data.shop, ...BRAND };

  return (
    <>
      <DocumentTitle name={shop.name} />
      <AnchorLink className="skip-link" targetId="main-content">
        پرش به محتوای اصلی
      </AnchorLink>
      <Header
        shop={shop}
        categories={categories}
        products={products}
        offers={offers}
      />
      <Outlet />
      <Footer shop={shop} categories={categories} />
    </>
  );
}

export default function Layout() {
  const theme = useThemeStore((s) => s.theme);
  const { state } = useCatalog();

  return (
    <div className="app" data-theme={theme}>
      {state.status === "success" ? <Frame data={state} /> : <Outlet />}
    </div>
  );
}
