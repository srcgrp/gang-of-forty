import { useState, useEffect } from "react";
import type { AppData, CartLine, LoadState, Product } from "./types";
import { loadAll } from "./shared/api/load";
import { Header } from "./components/Header";
import { CategoryNav } from "./components/CategoryNav";
import { ProductGrid } from "./components/ProductGrid";
import { CartPanel } from "./components/CartPanel";
import { SearchBox } from "./components/SearchBox";
import { SaleCountdown } from "./components/SaleCountdown";

export default function App() {
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [cart, setCart] = useState<CartLine[]>([]);
  const [query, setQuery] = useState("");
  const [state, setState] = useState<LoadState<AppData>>({ status: "loading" });

  useEffect(() => {
    let ignore = false;
    async function fetchData() {
      const res = await loadAll();
      if (!ignore) setState(res as LoadState<AppData>);
    }
    fetchData();
    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    document.title = cart.length > 0 ? `(${cart.length}) سبزکاله` : "سبزکاله";
  }, [cart]);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i,
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
        },
      ];
    });
  };

  if (state.status === "loading")
    return <div className="global-loader">در حال بارگذاری...</div>;
  if (state.status === "error") {
    return (
      <div className="state-error">
        <p>{state.message}</p>
        <button onClick={() => window.location.reload()}>تلاش مجدد</button>
      </div>
    );
  }

  const { products, categories } = state.data;
  const filtered = products.filter(
    (p) =>
      (categoryId === null || p.categoryId === categoryId) &&
      p.name.includes(query),
  );

  return (
    <>
      <Header />
      <SaleCountdown />
      <SearchBox query={query} onQuery={setQuery} />
      <CategoryNav
        categories={categories}
        activeId={categoryId}
        onPick={setCategoryId}
      />
      <ProductGrid products={filtered} onAdd={addToCart} />
      <CartPanel cart={cart} />
    </>
  );
}
