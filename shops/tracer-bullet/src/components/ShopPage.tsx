import type { Data } from "../types.ts";
import Footer from "../components/Footer.tsx";
import ProductGrid from "../components/ProductGrid.tsx";
import Header from "../components/Header.tsx";
import Hero from "../components/Hero.tsx";
import CategoryNav from "../components/CategoryNav.tsx";
import CartPanel from "../components/CartPanel.tsx";
import { withOfferAndStock } from "../catalog/product-catalog.ts";
import Promos from "./Promos.tsx";
import { useThemeStore } from "../hooks/useThemeStore.ts";
import { useCartTitle } from "../hooks/useCartTitle.ts";

type ShopPageProps = {
  data: Data;
  selectedId: number | null;
  onPick: (id: number | null) => void;
};

export default function ShopPage({ data, selectedId, onPick }: ShopPageProps) {
  useCartTitle();
  const theme = useThemeStore((s) => s.theme);

  const visible =
    selectedId === null
      ? data.products
      : data.products.filter((p) => p.categoryId === selectedId);

  const cards = visible.map((p) =>
    withOfferAndStock(p, data.offers, data.stock),
  );
  
  return (
    <div className="app" data-theme={theme}>
      <a href="#main" className="skip-link">
        پرش به محتوای اصلی
      </a>
      <Header shop={data.shop} categories={data.categories} />
      <main id="main">
        <Hero hero={data.home.hero} side={data.home.side} />
        <CategoryNav
          categories={data.categories}
          selectedId={selectedId}
          onPick={onPick}
        />
        <ProductGrid products={cards} />
        <Promos promos={data.home.promos} />
        <CartPanel />
      </main>
      <Footer shop={data.shop} categories={data.categories} />
    </div>
  );
}
