import { useEffect, useState } from "react";
import * as api from "./api/shop-api";
import { filterProductsByQuery } from "./catalog/filter-products";
import { toProductViews } from "./api/product-views";
import Storefront from "./components/Storefront";
import { addItem, countCartItems, removeItem, totalPrice } from "./cart/cart";
import { loadCart, saveCart } from "./storage/cart-storage";
import type { CartLine, Category, Home, LoadState, Shop } from "./types";
import { formatCount } from "./utils/format";
type StoreData = { categories: Category[]; home: Home; shop: Shop };
export default function App() {
  const [cart, setCart] = useState<CartLine[]>(() => loadCart());
  const [cartOpen, setCartOpen] = useState(false);
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [query, setQuery] = useState("");
  const [attempt, setAttempt] = useState(0);
  const [loadState, setLoadState] = useState<LoadState>({ status: "loading" });
  const [store, setStore] = useState<StoreData | null>(null);
  useEffect(() => {
    let ignore = false;
    Promise.all([
      api.fetchProducts(), api.fetchOffers(), api.fetchStock(),
      api.fetchCategories(), api.fetchShop(), api.fetchHome(),
    ])
      .then(([products, offers, stock, categories, shop, home]) => {
        if (ignore) return;
        setStore({ categories, home, shop });
        const items = toProductViews(products, offers, stock);
        if (ignore) return;
        setLoadState(items.length ? { status: "success", products: items } : { status: "empty" });
      })
      .catch((error: unknown) => {
        if (ignore) return;
        setLoadState({ status: "error", message: error instanceof Error ? error.message : "خطای نامشخص" });
      });
    return () => { ignore = true; };
  }, [attempt]);
  useEffect(() => { saveCart(cart); }, [cart]);
  const products = loadState.status === "success" ? loadState.products.map((item) => item.product) : [];
  const categories = store?.categories ?? [];
  const cartCount = countCartItems(cart);
  const cartTotal = totalPrice(cart, products);
  useEffect(() => {
    document.title = `سوپرمارکت ناردونه | 🛒 ${formatCount(countCartItems(cart))}`;
  }, [cart]);

  const handleAdd = (id: number) => setCart((lines) => addItem(lines, id));
  const handleRemove = (id: number) => setCart((lines) => removeItem(lines, id));
  const handleCartClick = () => setCartOpen((open) => !open);
  const handleCategoryPick = (id: number | null) => setCategoryId(id);
  const handleRetry = () => {
    setStore(null);
    setLoadState({ status: "loading" });
    setAttempt((current) => current + 1);
  };
  const visibleState = filterProductsByQuery(loadState, query, categories);
  return (
    <Storefront
      cart={cart} cartCount={cartCount} cartOpen={cartOpen} cartTotal={cartTotal}
      categories={categories} categoryId={categoryId} home={store?.home ?? null}
      loadState={visibleState} onRetry={handleRetry} products={products}
      query={query} onQueryChange={setQuery} shop={store?.shop ?? null}
      onAdd={handleAdd} onCartClick={handleCartClick}
      onCategoryPick={handleCategoryPick} onRemove={handleRemove}
    />
  );
}
