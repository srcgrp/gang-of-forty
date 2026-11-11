import { useEffect, useState } from "react";
import type { CartItem, LoadState, ShopData } from "./shared/types";
import { loadCatalog } from "./features/products/api/catalog-data";
import { getShop, getHome } from "./shared/api/site";
import { addItem, removeItem } from "./features/cart/logic/items";
import { toCard, offersById } from "./features/products/catalog/cards";
import LoadStatus from "./components/LoadStatus";
import ShopView from "./components/ShopView";

export default function App() {
  const [state, setState] = useState<LoadState<ShopData>>({ status: "loading" });
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  useEffect(() => {
    let ignore = false;
    Promise.all([loadCatalog(), getShop(), getHome()])
      .then(([catalog, shop, home]) => {
        if (ignore) return;
        const data: ShopData = { ...catalog, shop, home };
        setState(data.products.length ? { status: "success", data } : { status: "empty" });
      })
      .catch(() => {
        if (ignore) return;
        setState({ status: "error", message:
          "دریافت اطلاعات فروشگاه ممکن نشد. اتصال اینترنت را بررسی و صفحه را تازه‌سازی کنید." });
      });
    return () => { ignore = true; };
  }, []);
  function handleAdd(productId: number): void {
    if (state.status !== "success") return;
    const { products, stock, offers } = state.data;
    const product = products.find(item => item.id === productId);
    if (!product) return;
    const card = toCard(product, stock, offersById(offers));
    if (!card.available) return;
    setCart(previous => addItem(previous, card.item, stock.items[productId] ?? 0));
  }
  function handleRemove(productId: number): void {
    setCart(previous => removeItem(previous, productId));
  }
  if (state.status !== "success") {
    return <main className="wrap"><h1>بت‌شاپ</h1><LoadStatus state={state} /></main>;
  }
  return <ShopView data={state.data} cart={cart} categoryId={categoryId} cartOpen={cartOpen}
    onPick={setCategoryId} onCartOpen={setCartOpen} onAdd={handleAdd} onRemove={handleRemove} />;
}
