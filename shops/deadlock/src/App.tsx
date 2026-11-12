import { useEffect, useState } from "react";
import Header from "./components/Header";
import CategoryNav from "./components/CategoryNav";
import ProductGrid from "./components/ProductGrid";
import CartPanel from "./components/CartPanel";
import { getJSON, isOffer, isProduct, isStock } from "./api/api";
import { keepValid } from "./api/validation";
import { addToCart, cartTotal, removeFromCart } from "./features/cart/cartState";
import { loadCart, saveCart } from "./storage/cartStorage";
import type { CartLine, LoadState } from "./types";
function loadCatalog(): Promise<LoadState> {
  return Promise.all([getJSON("products"), getJSON("stock"), getJSON("offers")])
    .then(([rawProducts, rawStock, rawOffers]) => {
      const products = keepValid(rawProducts, isProduct, "products");
      const offers = keepValid(rawOffers, isOffer, "offers");
      if (!isStock(rawStock)) throw new Error("داده موجودی معتبر نیست.");
      if (products.length === 0) return { status: "empty" };
      return { status: "success", products, stock: rawStock, offers };
    });
}
export default function App() {
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [cart, setCart] = useState<CartLine[]>(loadCart);
  const [loadState, setLoadState] = useState<LoadState>({ status: "loading" });
  useEffect(() => {
    let ignore = false;
    loadCatalog()
      .then((nextState) => { if (!ignore) setLoadState(nextState); })
      .catch((error: unknown) => {
        if (ignore) return;
        console.error("بارگذاری اطلاعات فروشگاه ناموفق بود:", error);
        setLoadState({
          status: "error",
          message: error instanceof Error ? error.message : "خطای ناشناخته",
        });
      });
    return () => { ignore = true; };
  }, []);
  useEffect(() => { saveCart(cart); }, [cart]);
  useEffect(() => {
    const count = cart.reduce((total, line) => total + line.quantity, 0);
    document.title = `Herman Shop · 🛒 ${count.toLocaleString("fa-IR")}`;
  }, [cart]);

  const products = loadState.status === "success" ? loadState.products : [];
  const offers = loadState.status === "success" ? loadState.offers : [];
  const stock = loadState.status === "success" ? loadState.stock : undefined;
  const visibleProducts = categoryId === null
    ? products
    : products.filter((product) => product.categoryId === categoryId);
  const offerProducts = products.filter((product) =>
    offers.some((offer) => offer.productId === product.id),
  );
  const message = loadState.status === "error"
    ? `بارگذاری محصولات انجام نشد. ${loadState.message}`
    : "در حال حاضر محصولی برای نمایش نیست.";
  const cartCount = cart.reduce((count, line) => count + line.quantity, 0);

  return (
    <>
      <Header cartCount={cartCount} />
      <main id="main-content">
        <CategoryNav selectedId={categoryId} onPick={setCategoryId} />
        <ProductGrid id="tents" title="محصولات" products={visibleProducts} status={loadState.status} message={message} stock={stock} offers={offers} onAdd={(id) => setCart((current) => addToCart(current, id))} />
        <ProductGrid id="special-offers" title="پیشنهاد ویژه" products={offerProducts} status={loadState.status} message={message} stock={stock} offers={offers} onAdd={(id) => setCart((current) => addToCart(current, id))} />
        <CartPanel cart={cart} products={products} total={cartTotal(cart, products)} onRemove={(id) => setCart((current) => removeFromCart(current, id))} />
      </main>
    </>
  );
}
