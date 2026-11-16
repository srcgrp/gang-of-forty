import { useEffect, useState } from "react";
import { cartCount, cartLines } from "../features/cart/calculate";
import { selectProducts } from "../features/products/select";
import { useCartStore } from "../hooks/useCartStore";
import { useCatalog } from "../hooks/useCatalog";
import { useThemeStore } from "../hooks/useThemeStore";
import CartPanel from "./CartPanel";
import CategoryNav from "./CategoryNav";
import Footer from "./Footer";
import Header from "./Header";
import Hero from "./Hero";
import ProductGrid from "./ProductGrid";
import SaleCountdown from "./SaleCountdown";
import Status from './Status'

export default function ShopPage() {
  const { state, retry } = useCatalog();
  const theme = useThemeStore((s) => s.theme);
  const items = useCartStore((s) => s.items);
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [query, setQuery] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showCountdown, setShowCountdown] = useState(true);

  useEffect(() => {
    if (state.status !== "success") return;
    document.title = `${state.data.shop.name} · 🛒 ${cartCount(cartLines(items, state.data.products)).toLocaleString("fa-IR")}`;
  }, [items, state]);

  if (state.status !== "success") {
    return (
      <div className="app" data-theme={theme}>
        <Status state={state} onRetry={retry} />
      </div>
    );
  }

  const { products, categories, home, shop } = state.data;
  const results = selectProducts(products, categoryId, query);
  const visible =
    categoryId !== null || query.trim() || showAll
      ? results
      : results.slice(0, 12);

  return (
    <>
      <a className="skip-link" href="#content">
        پرش به محتوای اصلی
      </a>
      <Header
        shop={shop}
        categories={categories}
        query={query}
        onQuery={setQuery}
        onOpenCart={() => setIsCartOpen(true)}
        onPickCategory={setCategoryId}
      />
      <main id="content" tabIndex={-1}>
        <h1 className="sr-only">فروشگاه</h1>
        <Hero main={home.hero} side={home.side} />
        <CategoryNav
          categories={categories}
          activeId={categoryId}
          onPick={setCategoryId}
        />
        {showCountdown && (
          <SaleCountdown onClose={() => setShowCountdown(false)} />
        )}
        <div className="shop-layout container">
          <ProductGrid
            products={visible}
            showAll={showAll}
            onToggleAll={() => setShowAll((open) => !open)}
            showToggle={categoryId === null && !query.trim()}
            showSaleButton={!showCountdown}
            onShowSale={() => setShowCountdown(true)}
          />
        </div>
      </main>
      <Footer shop={shop} categories={categories} />
      <div className={`cart-root${isCartOpen ? " is-open" : ""}`}>
        <div
          className="cart-overlay"
          aria-hidden="true"
          onClick={() => setIsCartOpen(false)}
        />
        <CartPanel products={products} onClose={() => setIsCartOpen(false)} />
      </div>
    </>
  );
}
